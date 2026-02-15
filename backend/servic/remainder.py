def schedule_medication_reminders(patient_id: str) -> list:
    """Schedule medication reminders for a patient"""
    try:
        medications_ref = get_collection(Collections.MEDICATIONS)
        active_medications = medications_ref.where('patient_id', '==', patient_id)\
            .where('status', '==', 'active')\
            .stream()
        
        medications_list = list(active_medications)
        reminders = []
        
        for med_doc in medications_list:
            medication = med_doc.to_dict()
            medication_id = med_doc.id
            
            tomorrow = datetime.utcnow() + timedelta(days=1)
            reminder_time = tomorrow.replace(hour=9, minute=0, second=0, microsecond=0)
            
            reminder = schedule_reminder({
                'type': ReminderTypes.MEDICATION,
                'recipient_id': patient_id,
                'recipient_type': 'patient',
                'scheduled_for': reminder_time.isoformat(),
                'message': f"Reminder: Take your medication - {medication['medication_name']} ({medication['dosage']})",
                'metadata': {
                    'medication_id': medication_id,
                    'medication_name': medication['medication_name'],
                    'dosage': medication['dosage'],
                    'frequency': medication['frequency']
                }
            })
            
            reminders.append(reminder)
        
        return reminders
    except Exception as e:
        print(f"Error scheduling medication reminders: {e}")
        return []

def schedule_mood_entry_reminder(patient_id: str) -> dict:
    """Schedule mood entry reminder for a patient"""
    try:
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        mood_entries_ref = get_collection(Collections.MOOD_ENTRIES)
        today_entries = mood_entries_ref.where('patient_id', '==', patient_id)\
            .where('date', '>=', today.isoformat())\
            .limit(1)\
            .stream()
        
        if not list(today_entries):
            reminder_time = datetime.utcnow().replace(hour=20, minute=0, second=0, microsecond=0)
            
            if reminder_time > datetime.utcnow():
                return schedule_reminder({
                    'type': ReminderTypes.MOOD_ENTRY,
                    'recipient_id': patient_id,
                    'recipient_type': 'patient',
                    'scheduled_for': reminder_time.isoformat(),
                    'message': "Reminder: Don't forget to log your mood and journal entry for today",
                    'metadata': {}
                })
        
        return None
    except Exception as e:
        print(f"Error scheduling mood entry reminder: {e}")
        return None

def initialize_reminder_scheduler():
    """Initialize the reminder scheduler"""
    try:
        scheduler.add_job(
            process_due_reminders,
            'interval',
            minutes=60,
            id='process_reminders',
            replace_existing=True
        )
        
        scheduler.start()
        print("Reminder scheduler initialized")
    except Exception as e:
        print(f"Error initializing reminder scheduler: {e}")

def get_user_reminders(user_id: str, user_type: str) -> list:
    """Get all reminders for a user"""
    try:
        reminders_ref = get_collection(Collections.REMINDERS)
        user_reminders = reminders_ref.where('recipient_id', '==', user_id)\
            .where('recipient_type', '==', user_type)\
            .order_by('scheduled_for', direction='DESCENDING')\
            .limit(50)\
            .stream()
        
        return [
            {'id': reminder.id, **reminder.to_dict()}
            for reminder in user_reminders
        ]
    except Exception as e:
        print(f"Error getting user reminders: {e}")
        return []

reminder.py