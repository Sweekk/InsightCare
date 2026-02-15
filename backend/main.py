from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import ai_routes

app = FastAPI(title="InsightCare API")

# CORS settings (frontend safe)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register AI routes
app.include_router(ai_routes.router, prefix="/ai", tags=["AI"])


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

