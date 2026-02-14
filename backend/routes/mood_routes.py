from fastapi import APIRouter, HTTPException
from services.mood_service import list_moods_for_patient, add_mood

router = APIRouter()

@router.get('/patient/{patient_id}')
def moods_for_patient(patient_id: str):
    return list_moods_for_patient(patient_id)

@router.post('/patient/{patient_id}')
def create_mood(patient_id: str, payload: dict):
    return add_mood(patient_id, payload)
