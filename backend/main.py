from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import patient_routes, mood_routes, ai_routes

app = FastAPI(title='InsightCare API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient_routes.router, prefix='/patients', tags=['patients'])
app.include_router(mood_routes.router, prefix='/moods', tags=['moods'])
app.include_router(ai_routes.router, prefix='/ai', tags=['ai'])

@app.get('/health')
def health():
    return {'status': 'ok'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('backend.main:app', host='0.0.0.0', port=8000, reload=True)
