"""
Alert service for automated alert generation
"""
alert.py

from datetime import datetime, timedelta
from app.config import Collections, get_collection
from app.utils import AlertTypes, AlertSeverity

def create_automatic_alert(alert_data: dict) -> dict:
    """Create an automatic alert"""
    try:
        patient_id = alert_data['patient_id']
        alert_type = alert_data['type']
        doctor_id = alert_data['doctor_id']
        severity = alert_data['severity']
        message = alert_data['message']
        metadata = alert_data.get('metadata', {})
        
        one_day_ago = datetime.utcnow() - timedelta(days=1)
        
        alerts_ref = get_collection(Collections.ALERTS)
        existing_alerts = alerts_ref.where('patient_id', '==', patient_id)\
            .where('type', '==', alert_type)\
            .where('created_at', '>=', one_day_ago.isoformat())\
            .limit(1)\
            .stream()
        
        if list(existing_alerts):
            print(f"Similar alert already exists for patient {patient_id}, type: {alert_type}")
            return None
        
        alert = {
            'patient_id': patient_id,
            'doctor_id': doctor_id,
            'type': alert_type,
            'severity': severity,
            'message': message,
            'metadata': metadata,
            'is_read': False,
            'created_at': datetime.utcnow().isoformat()
        }
        
        doc_ref = alerts_ref.add(alert)
        alert_id = doc_ref[1].id
        
        print(f"Alert created: {alert_id} for patient {patient_id}")
        
        return {
            'id': alert_id,
            **alert
        }
    except Exception as e:
        print(f"Error creating automatic alert: {e}")
        raise

def create_alert(alert_data: dict) -> dict:
    """Create alert manually"""
    try:
        alert = {
            **alert_data,
            'is_read': False,
            'created_at': datetime.utcnow().isoformat()
        }
        
        alerts_ref = get_collection(Collections.ALERTS)
        doc_ref = alerts_ref.add(alert)
        alert_id = doc_ref[1].id
        
        return {
            'id': alert_id,
            **alert
        }
    except Exception as e:
        print(f"Error creating alert: {e}")
        raise

def get_unread_alert_count(doctor_id: str) -> int:
    """Get unread alert count for a doctor"""
    try:
        alerts_ref = get_collection(Collections.ALERTS)
        unread_alerts = alerts_ref.where('doctor_id', '==', doctor_id)\
            .where('is_read', '==', False)\
            .stream()
        
        return len(list(unread_alerts))
    except Exception as e:
        print(f"Error getting unread alert count: {e}")
        return 0

def get_critical_alerts(doctor_id: str) -> list:
    """Get critical alerts for a doctor"""
    try:
        alerts_ref = get_collection(Collections.ALERTS)
        critical_alerts = alerts_ref.where('doctor_id', '==', doctor_id)\
            .where('severity', 'in', [AlertSeverity.CRITICAL, AlertSeverity.HIGH])\
            .where('is_read', '==', False)\
            .order_by('created_at', direction='DESCENDING')\
            .limit(10)\
            .stream()
        
        return [
            {'id': alert.id, **alert.to_dict()}
            for alert in critical_alerts
        ]
    except Exception as e:
        print(f"Error getting critical alerts: {e}")
        return []

def resolve_alert(alert_id: str, resolved_by: str) -> bool:
    """Resolve an alert"""
    try:
        alerts_ref = get_collection(Collections.ALERTS)
        alert_doc = alerts_ref.document(alert_id)
        
        alert_doc.update({
            'is_read': True,
            'resolved': True,
            'resolved_by': resolved_by,
            'resolved_at': datetime.utcnow().isoformat()
        })
        
        return True
    except Exception as e:
        print(f"Error resolving alert: {e}")
        return False