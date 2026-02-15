# backend/db/firestore.py

def get_patient_data(patient_id: str):
    """
    Temporary dummy database layer.
    Later this will be replaced by real Firestore fetch logic.
    """

    dummy_db = {
        "p001": {
            "name": "Rahul",
            "age": 21,
            "gender": "Male",
            "mood_logs": [
                {"date": "2025-02-01", "mood": "anxious", "note": "Exam stress"},
                {"date": "2025-02-03", "mood": "low", "note": "Poor sleep"},
                {"date": "2025-02-05", "mood": "sad", "note": "Lack of motivation"},
                {"date": "2025-02-07", "mood": "slightly better", "note": "Talked to friends"}
            ],
            "doctor_notes": [
                "Mild anxiety symptoms observed",
                "Sleep cycle disturbed",
                "Needs weekly follow-up"
            ],
            "risk_flags": ["anxiety", "burnout"]
        },

        "p002": {
            "name": "Ananya",
            "age": 19,
            "gender": "Female",
            "mood_logs": [
                {"date": "2025-02-02", "mood": "very low", "note": "Social isolation"},
                {"date": "2025-02-04", "mood": "hopeless", "note": "Negative self-talk"},
                {"date": "2025-02-06", "mood": "tearful", "note": "Overthinking"}
            ],
            "doctor_notes": [
                "Moderate depression indicators",
                "Emotional distress significant"
            ],
            "risk_flags": ["depression", "self-esteem issues"]
        }
    }

    return dummy_db.get(patient_id, {"error": "Patient not found"})
