from services.firestore_service import get_collection

def list_moods_for_patient(patient_id: str):
    col = get_collection('moods')
    docs = col.where('patient_id', '==', patient_id).stream()
    return [ {**d.to_dict(), 'id': d.id} for d in docs ]

def add_mood(patient_id: str, mood: dict):
    col = get_collection('moods')
    data = {**mood, 'patient_id': patient_id}
    res = col.add(data)
    return {'id': res[1].id, **data}
