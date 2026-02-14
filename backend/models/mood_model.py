from pydantic import BaseModel
from typing import Optional

class Mood(BaseModel):
    id: Optional[str]
    patient_id: str
    score: int
    note: Optional[str] = None
