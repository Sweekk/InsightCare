import os
import json
import re
from dotenv import load_dotenv
from google import genai

load_dotenv()

# Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

generation_config = {
    "temperature": 0.15,
    "top_p": 0.9,
    "max_output_tokens": 512
}


def generate_patient_summary(patient, moods=None, notes=None):

    prompt = f"""
You are a senior clinical mental health AI assistant.

Analyze the following patient data and write a detailed clinical summary.

Include:
- Patient overview (age, gender)
- Emotional and mood trends
- Key issues from mood history
- Insights from doctor notes
- Risk assessment (LOW / MEDIUM / HIGH)
- Short recommendation for next steps

Rules:
- Write in professional plain English
- Do NOT use JSON
- Do NOT use markdown
- Do NOT use bullet points
- Write in paragraph form only

Patient details:
{patient}

Mood history:
{moods}

Doctor notes:
{notes}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "temperature": 0.15,
            "top_p": 0.9,
            "max_output_tokens": 800
        }
    )

    return response.text.strip()

