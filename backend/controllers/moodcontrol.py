def get_mood_entries(patient_id):
    """Get mood entries for a patient"""
    try:
        user_id = request.user['user_id']
        role = request.user['role']
        
        if role == 'patient' and user_id != patient_id:
            raise AppError('Unauthorized access', 403, 'UNAUTHORIZED')
        
        limit = int(request.args.get('limit', 50))
        
        mood_ref = get_collection(Collections.MOOD_ENTRIES)
        moods = mood_ref.where('patient_id', '==', patient_id).limit(limit).stream()
        mood_entries = [{'id': m.id, **m.to_dict()} for m in moods]
        
        # Calculate statistics
        scores = [m['mood_score'] for m in mood_entries if 'mood_score' in m]
        
        stats = {
            'total_entries': len(mood_entries),
            'average_mood': round(calculate_average(scores), 2) if scores else 0,
            'highest_mood': max(scores) if scores else 0,
            'lowest_mood': min(scores) if scores else 0
        }
        
        return jsonify({
            'success': True,
            'data': {'mood_entries': mood_entries, 'statistics': stats},
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except AppError:
        raise
    except Exception as e:
        raise AppError(str(e), 500, 'GET_MOODS_ERROR')
mood.py