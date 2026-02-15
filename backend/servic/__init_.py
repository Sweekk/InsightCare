"""
Services package
"""

from .alert_service import (
    create_automatic_alert, create_alert, get_unread_alert_count,
    get_critical_alerts, resolve_alert
)
from .reminder_service import (
    schedule_reminder, get_pending_reminders, mark_reminder_as_sent,
    process_due_reminders, schedule_medication_reminders,
    schedule_mood_entry_reminder, initialize_reminder_scheduler,
    get_user_reminders
)

all = [
    'create_automatic_alert', 'create_alert', 'get_unread_alert_count',
    'get_critical_alerts', 'resolve_alert',
    'schedule_reminder', 'get_pending_reminders', 'mark_reminder_as_sent',
    'process_due_reminders', 'schedule_medication_reminders',
    'schedule_mood_entry_reminder', 'initialize_reminder_scheduler',
    'get_user_reminders'
]