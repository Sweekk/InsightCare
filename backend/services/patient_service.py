from models.patient_model import Patient
from services.firestore_service import get_collection

def list_patients():
    col = get_collection('patients')
    docs = col.stream()
    return [ {**doc.to_dict(), 'id': doc.id} for doc in docs ]

def get_patient(patient_id: str):
    doc = get_collection('patients').document(patient_id).get()
    if not doc.exists:
        return None
    data = doc.to_dict()
    data['id'] = doc.id
    return data

def create_patient(data: dict):
    col = get_collection('patients')
    res = col.add(data)
    return {'id': res[1].id, **data}
