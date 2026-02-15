import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

# Create Gemini client (NEW SDK way)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

generation_config = {
    "temperature": 0.15,
    "top_p": 0.9,
    "max_output_tokens": 800
}


def generate_doctor_dashboard(patients_data):
    """
    patients_data: list of dicts containing patient summaries + risks
    """

    prompt = f"""
You are a senior clinical AI assistant helping psychiatrists and mental health professionals.

Patient dataset:
{patients_data}

Your tasks:
1. Identify high-risk patients.
2. Detect overall emotional patterns.
3. Suggest clinical priorities.
4. Generate doctor dashboard summary.
5. Recommend immediate interventions if needed.

Return response STRICTLY in JSON format:

{{
  "total_patients": "",
  "high_risk_patients": [],
  "overall_patterns": "",
  "clinical_priorities": "",
  "recommended_actions": "",
  "dashboard_summary": ""
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=generation_config
    )

    return response.text


 