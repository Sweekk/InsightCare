def generate_patient_summary(
    mood_entries: List[Dict],
    medications: List[Dict],
    appointments: List[Dict]
) -> Dict:
    """
    Generate patient summary for AI analysis
    """
    mood_scores = [e.get('mood_score', 0) for e in mood_entries]
    
    summary = {
        'total_mood_entries': len(mood_entries),
        'average_mood': round(calculate_average(mood_scores), 2),
        'mood_trend': calculate_treatment_progress(mood_entries),
        'recent_emotions': [],
        'common_triggers': [],
        'medication_count': len(medications),
        'appointment_count': len(appointments)
    }
    
    # Extract recent emotions
    emotion_counts = {}
    for entry in mood_entries[:14]:
        for emotion in entry.get('emotions', []):
            emotion_counts[emotion] = emotion_counts.get(emotion, 0) + 1
    
    summary['recent_emotions'] = [
        {'emotion': emotion, 'count': count}
        for emotion, count in sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]
    
    # Extract common triggers
    trigger_counts = {}
    for entry in mood_entries:
        for trigger in entry.get('triggers_identified', []):
            trigger_counts[trigger] = trigger_counts.get(trigger, 0) + 1
    
    summary['common_triggers'] = [
        {'trigger': trigger, 'count': count}
        for trigger, count in sorted(trigger_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]
    
    return summary

def calculate_correlation(x: List[float], y: List[float]) -> float:
    """Calculate Pearson correlation coefficient"""
    if not x or not y or len(x) != len(y) or len(x) == 0:
        return 0.0
    
    n = len(x)
    sum_x = sum(x)
    sum_y = sum(y)
    sum_xy = sum(xi * yi for xi, yi in zip(x, y))
    sum_x2 = sum(xi  2 for xi in x)
    sum_y2 = sum(yi  2 for yi in y)
    
    numerator = n * sum_xy - sum_x * sum_y
    denominator = ((n * sum_x2 - sum_x  2) * (n * sum_y2 - sum_y  2)) ** 0.5
    
    if denominator == 0:
        return 0.0
    
    return numerator / denominator

helpers.py