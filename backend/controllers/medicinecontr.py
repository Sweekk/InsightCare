"""
Medication management controller
"""
from datetime import datetime
from flask import request, jsonify
from app.config import Collections, get_collection
from app.middleware import AppError

def add_medication():
    """Add medication for patient"""
    try:
        user_id = request.user['user_id']
        data = request.validated_data
        
        med_data = {
            **data,
            'doctor_id': user_id,
            'status': 'active',
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        meds_ref = get_collection(Collections.MEDICATIONS)
        doc_ref = meds_ref.add(med_data)
        
        return jsonify({
            'success': True,
            'data': {'id': doc_ref[1].id, **med_data},
            'message': 'Medication added successfully',
            'timestamp': datetime.utcnow().isoformat()
        }), 201
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'ADD_MEDICATION_ERROR')

def get_medications(patient_id):
    """Get medications for patient"""
    try:
        status = request.args.get('status', 'active')
        
        meds_ref = get_collection(Collections.MEDICATIONS)
        query = meds_ref.where('patient_id', '==', patient_id)
        
        if status:
            query = query.where('status', '==', status)
        
        medications = [{'id': m.id, **m.to_dict()} for m in query.stream()]
        
        return jsonify({
            'success': True,
            'data': {'medications': medications, 'total': len(medications)},
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'GET_MEDICATIONS_ERROR')

def track_medication_intake():
    """Track medication intake"""
    try:
        data = request.validated_data
        
        tracking_data = {
            **data,
            'created_at': datetime.utcnow().isoformat()
        }
        
        tracking_ref = get_collection(Collections.MEDICATION_TRACKING)
        doc_ref = tracking_ref.add(tracking_data)
        
        return jsonify({
            'success': True,
            'data': {'id': doc_ref[1].id, **tracking_data},
            'message': 'Medication intake tracked',
            'timestamp': datetime.utcnow().isoformat()
        }), 201
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'TRACK_MEDICATION_ERROR')

medication.py