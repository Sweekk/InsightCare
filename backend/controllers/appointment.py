"""
Appointment management controller
"""
from datetime import datetime, timedelta
from flask import request, jsonify
from app.config import Collections, get_collection
from app.middleware import AppError
from app.services import schedule_reminder
from app.utils import ReminderTypes, AppointmentStatus

def create_appointment():
    """Create appointment"""
    try:
        user_id = request.user['user_id']
        data = request.validated_data
        
        appt_data = {
            **data,
            'status': AppointmentStatus.SCHEDULED,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        appts_ref = get_collection(Collections.APPOINTMENTS)
        doc_ref = appts_ref.add(appt_data)
        
        # Schedule reminders
        appt_time = datetime.fromisoformat(data['date_time'])
        
        # 24 hour reminder
        reminder_24h = appt_time - timedelta(hours=24)
        if reminder_24h > datetime.utcnow():
            schedule_reminder({
                'type': ReminderTypes.APPOINTMENT,
                'recipient_id': data['patient_id'],
                'recipient_type': 'patient',
                'scheduled_for': reminder_24h.isoformat(),
                'message': f'Reminder: Appointment tomorrow at {appt_time.strftime("%I:%M %p")}',
                'metadata': {'appointment_id': doc_ref[1].id}
            })
        
        return jsonify({
            'success': True,
            'data': {'id': doc_ref[1].id, **appt_data},
            'message': 'Appointment created successfully',
            'timestamp': datetime.utcnow().isoformat()
        }), 201
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'CREATE_APPOINTMENT_ERROR')

def get_appointments():
    """Get appointments"""
    try:
        user_id = request.user['user_id']
        role = request.user['role']
        
        appts_ref = get_collection(Collections.APPOINTMENTS)
        
        if role == 'patient':
            query = appts_ref.where('patient_id', '==', user_id)
        else:
            query = appts_ref.where('doctor_id', '==', user_id)
        
        appointments = [{'id': a.id, **a.to_dict()} for a in query.stream()]
        
        return jsonify({
            'success': True,
            'data': {'appointments': appointments, 'total': len(appointments)},
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'GET_APPOINTMENTS_ERROR')

appointment.py