from fastapi import APIRouter, HTTPException
from services.patient_service import list_patients, get_patient_data, create_patient

router = APIRouter()

@router.get('/')
def get_patients():
    return list_patients()

@router.get('/{patient_id}')
def read_patient(patient_id: str):
    p = get_patient_data(patient_id)
    if not p:
        raise HTTPException(status_code=404, detail='Patient not found')
    return p

@router.post('/')
def add_patient(payload: dict):
    return create_patient(payload)
