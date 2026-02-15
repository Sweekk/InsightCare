"""
Mental Health Tracker Backend API
Main Flask application
"""
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from datetime import datetime

from app.config import get_config
from app.middleware import register_error_handlers
from app.routes import (
    auth_bp, doctor_bp, patient_bp, mood_bp,
    medication_bp, appointment_bp, alert_bp
)
from app.services import initialize_reminder_scheduler

def create_app():
    """Application factory"""
    app = Flask(name)
    
    # Load configuration
    config = get_config()
    app.config.from_object(config)
    
    # Initialize CORS
    CORS(app, origins=config.CORS_ORIGINS, supports_credentials=True)
    
    # Initialize rate limiter
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        storage_uri=config.RATELIMIT_STORAGE_URL,
        default_limits=[config.RATELIMIT_DEFAULT]
    )
    
    # Register error handlers
    register_error_handlers(app)
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({
            'success': True,
            'message': 'Server is running',
            'timestamp': datetime.utcnow().isoformat(),
            'environment': config.FLASK_ENV
        }), 200
    
    # API info endpoint
    @app.route('/api', methods=['GET'])
    def api_info():
        return jsonify({
            'success': True,
            'message': 'Mental Health Tracker API',
            'version': '1.0.0',
            'endpoints': {
                'auth': '/api/auth',
                'doctors': '/api/doctors',
                'patients': '/api/patients',
                'mood_entries': '/api/mood-entries',
                'medications': '/api/medications',
                'appointments': '/api/appointments',
                'alerts': '/api/alerts'
            },
            'documentation': 'See README.md for detailed API documentation'
        }), 200
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(doctor_bp, url_prefix='/api/doctors')
    app.register_blueprint(patient_bp, url_prefix='/api/patients')
    app.register_blueprint(mood_bp, url_prefix='/api/mood-entries')
    app.register_blueprint(medication_bp, url_prefix='/api/medications')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
    app.register_blueprint(alert_bp, url_prefix='/api/alerts')
    
    # Initialize reminder scheduler
    if not app.config['TESTING']:
        try:
            initialize_reminder_scheduler()
            print('✅ Reminder scheduler initialized')
        except Exception as e:
            print(f'⚠️  Reminder scheduler failed to initialize: {e}')
    
    return app

# Create app instance
app = create_app()

if name == 'main':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print('=' * 60)
    print(f'🚀 Server running in {os.getenv("FLASK_ENV", "development")} mode')
    print(f'📡 Listening on port {port}')
    print(f'🌐 API Base URL: http://localhost:{port}/api')
    print(f'💊 Health Check: http://localhost:{port}/health')
    print('=' * 60)
    
    app.run(host='0.0.0.0', port=port, debug=debug)