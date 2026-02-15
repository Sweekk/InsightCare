"""
Firebase configuration and initialization
"""
import os
import json
import firebase_admin
from firebase_admin import credentials, firestore, auth as firebase_auth
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
def initialize_firebase():
    """Initialize Firebase Admin SDK with credentials"""
    
    if firebase_admin._apps:
        # Already initialized
        return firestore.client()
    
    # Try to load from service account file
    creds_path = os.getenv('FIREBASE_CREDENTIALS_PATH')
    
    if creds_path and os.path.exists(creds_path):
        # Use service account file
        cred = credentials.Certificate(creds_path)
    else:
        # Use environment variables
        firebase_config = {
            "type": "service_account",
            "project_id": os.getenv('FIREBASE_PROJECT_ID'),
            "private_key": os.getenv('FIREBASE_PRIVATE_KEY', '').replace('\\n', '\n'),
            "client_email": os.getenv('FIREBASE_CLIENT_EMAIL'),
            "token_uri": "https://oauth2.googleapis.com/token",
        }
        cred = credentials.Certificate(firebase_config)
    
    # Initialize app
    firebase_admin.initialize_app(cred, {
        'databaseURL': os.getenv('FIREBASE_DATABASE_URL')
    })
    
    return firestore.client()

# Get Firestore client
db = initialize_firebase()

# Collection references
class Collections:
    """Firestore collection references"""
    USERS = 'users'
    DOCTORS = 'doctors'
    PATIENTS = 'patients'
    MOOD_ENTRIES = 'moodEntries'
    MEDICATIONS = 'medications'
    MEDICATION_TRACKING = 'medicationTracking'
    APPOINTMENTS = 'appointments'
    ALERTS = 'alerts'
    REMINDERS = 'reminders'

def get_collection(collection_name):
    """Get a Firestore collection reference"""
    return db.collection(collection_name)

def get_timestamp():
    """Get server timestamp"""
    return firestore.SERVER_TIMESTAMP

firebase.py