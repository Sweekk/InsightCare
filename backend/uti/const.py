"""
Application constants
"""
*constants.py*

# User roles
class UserRoles:
    DOCTOR = 'doctor'
    PATIENT = 'patient'

# Patient status
class PatientStatus:
    ACTIVE = 'active'
    DISCHARGED = 'discharged'
    INACTIVE = 'inactive'

# Severity levels (for filtering patients)
class SeverityLevels:
    GREEN = 'green'    # Stable/Improving
    YELLOW = 'yellow'  # Moderate concern
    RED = 'red'        # Critical/High risk

# Alert types
class AlertTypes:
    CRITICAL_MOOD_DROP = 'critical_mood_drop'
    SUICIDAL_THOUGHTS = 'suicidal_thoughts'
    CONCERNING_PATTERN = 'concerning_pattern'
    MEDICATION_SIDE_EFFECT = 'medication_side_effect'
    NO_IMPROVEMENT = 'no_improvement'
    MISSED_APPOINTMENT = 'missed_appointment'

# Alert severity
class AlertSeverity:
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    CRITICAL = 'critical'

# Appointment status
class AppointmentStatus:
    SCHEDULED = 'scheduled'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    MISSED = 'missed'

# Mood keywords for sentiment analysis
MOOD_KEYWORDS = {
    'SUICIDAL': [
        'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
        'no reason to live', 'self harm', 'hurt myself', 'not worth living',
        'end it all', 'take my life', 'kill me'
    ],
    'SEVERELY_NEGATIVE': [
        'hopeless', 'worthless', 'despair', 'unbearable', "can't go on",
        'trapped', 'no way out', 'overwhelming', 'devastating', 'empty',
        'meaningless', 'give up'
    ],
    'NEGATIVE': [
        'sad', 'depressed', 'anxious', 'worried', 'scared', 'angry',
        'frustrated', 'lonely', 'isolated', 'stressed', 'tired', 'exhausted',
        'upset', 'miserable', 'unhappy', 'down'
    ],
    'POSITIVE': [
        'happy', 'better', 'good', 'improving', 'hopeful', 'calm',
        'peaceful', 'relaxed', 'grateful', 'optimistic', 'progress',
        'encouraged', 'content', 'joyful', 'pleased'
    ]
}

# Medication side effect severity
class SideEffectSeverity:
    MILD = 'mild'
    MODERATE = 'moderate'
    SEVERE = 'severe'

# Treatment progress status
class TreatmentProgress:
    IMPROVING = 'improving'
    STABLE = 'stable'
    DECLINING = 'declining'
    NO_CHANGE = 'no_change'

# Reminder types
class ReminderTypes:
    APPOINTMENT = 'appointment'
    MEDICATION = 'medication'
    MOOD_ENTRY = 'mood_entry'
    FOLLOW_UP = 'follow_up'