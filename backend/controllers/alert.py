"""
Alert management controller
"""
from datetime import datetime
from flask import request, jsonify
from app.config import Collections, get_collection
from app.middleware import AppError

def get_alerts():
    """Get alerts for doctor"""
    try:
        user_id = request.user['user_id']
        is_read = request.args.get('is_read')
        severity = request.args.get('severity')
        limit = int(request.args.get('limit', 50))
        
        alerts_ref = get_collection(Collections.ALERTS)
        query = alerts_ref.where('doctor_id', '==', user_id)
        
        if is_read is not None:
            query = query.where('is_read', '==', is_read.lower() == 'true')
        if severity:
            query = query.where('severity', '==', severity)
        
        alerts = [{'id': a.id, **a.to_dict()} for a in query.limit(limit).stream()]
        
        # Count unread
        unread = alerts_ref.where('doctor_id', '==', user_id).where('is_read', '==', False).stream()
        
        return jsonify({
            'success': True,
            'data': {'alerts': alerts, 'unread_count': len(list(unread)), 'total': len(alerts)},
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'GET_ALERTS_ERROR')

def mark_alert_as_read(alert_id):
    """Mark alert as read"""
    try:
        user_id = request.user['user_id']
        
        alerts_ref = get_collection(Collections.ALERTS)
        alert_doc = alerts_ref.document(alert_id).get()
        
        if not alert_doc.exists:
            raise AppError('Alert not found', 404, 'ALERT_NOT_FOUND')
        
        alert_data = alert_doc.to_dict()
        
        if alert_data['doctor_id'] != user_id:
            raise AppError('Unauthorized access', 403, 'UNAUTHORIZED')
        
        alerts_ref.document(alert_id).update({
            'is_read': True,
            'read_at': datetime.utcnow().isoformat()
        })
        
        return jsonify({
            'success': True,
            'message': 'Alert marked as read',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'MARK_READ_ERROR')
alert.py