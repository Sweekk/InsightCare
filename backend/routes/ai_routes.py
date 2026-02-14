from fastapi import APIRouter
from ai.patient_ai import generate_patient_summary

router = APIRouter()

@router.post('/patient-summary')
def patient_summary(payload: dict):
    return {'summary': generate_patient_summary(payload)}
