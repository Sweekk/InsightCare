from fastapi import APIRouter
from typing import Dict

# ✅ ADD THESE IMPORTS
from ai.patient_ai import generate_patient_summary
from db.firestore import get_patient_data

router = APIRouter()

@router.get("/patient-summary/{patient_id}", response_model=Dict[str, str])
def patient_summary(patient_id: str):
    patient_id = patient_id.strip()
    patient_data = get_patient_data(patient_id)

    summary_text = generate_patient_summary(
        patient=patient_data,
        moods=patient_data.get("mood_logs", []),
        notes=patient_data.get("doctor_notes", [])
    )

    return {
        "patient_id": patient_id,
        "summary": summary_text
    }






