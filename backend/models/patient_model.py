from pydantic import BaseModel
from typing import Optional

class Patient(BaseModel):
    id: Optional[str]
    name: str
    age: int
    notes: Optional[str] = None
