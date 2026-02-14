def generate_patient_summary(patient: dict) -> str:
    name = patient.get('name', 'Unknown')
    age = patient.get('age', 'N/A')
    return f"Patient {name}, age {age}. No advanced AI available in scaffold."
