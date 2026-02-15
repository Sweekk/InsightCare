import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    
    # Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # JWT
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 7)))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES', 30)))
    
    # CORS
    CORS_ORIGINS = os.getenv('FRONTEND_URL', 'http://localhost:3000').split(',')
    
    # Rate Limiting
    RATELIMIT_STORAGE_URL = "memory://"
    RATELIMIT_DEFAULT = f"{os.getenv('RATE_LIMIT_PER_MINUTE', 100)}/minute;{os.getenv('RATE_LIMIT_PER_HOUR', 1000)}/hour"
    
    # Alert Thresholds
    CRITICAL_MOOD_THRESHOLD = int(os.getenv('CRITICAL_MOOD_THRESHOLD', 3))
    CONCERNING_PATTERN_DAYS = int(os.getenv('CONCERNING_PATTERN_DAYS', 5))
    LOW_MOOD_THRESHOLD = int(os.getenv('LOW_MOOD_THRESHOLD', 5))
    
    # Reminder Configuration
    REMINDER_CHECK_INTERVAL = int(os.getenv('REMINDER_CHECK_INTERVAL', 60))

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

class TestingConfig(Config):
    TESTING = True
    DEBUG = True


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
def get_config():
    env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])

config.py