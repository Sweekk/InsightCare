try:
    import firebase_admin
    from firebase_admin import credentials, firestore
except Exception:
    firebase_admin = None

_db = None

def init_firestore():
    global _db
    if _db is not None:
        return _db
    if firebase_admin is None:
        raise RuntimeError('firebase_admin is not installed')
    import os
    from config import FIREBASE_SERVICE_ACCOUNT
    cred = credentials.Certificate(FIREBASE_SERVICE_ACCOUNT) if os.path.exists(FIREBASE_SERVICE_ACCOUNT) else credentials.ApplicationDefault()
    try:
        firebase_admin.initialize_app(cred)
    except Exception:
        pass
    _db = firestore.client()
    return _db

def get_collection(name):
    db = init_firestore()
    return db.collection(name)
