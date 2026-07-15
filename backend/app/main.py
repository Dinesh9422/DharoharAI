from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import monuments, users, quiz, festivals, community
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="DharoharAI API",
    description="India's Heritage & Culture Platform API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://dharoharai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(monuments.router, prefix="/api/monuments", tags=["Monuments"])
app.include_router(quiz.router, prefix="/api/quiz", tags=["Quiz"])
app.include_router(festivals.router, prefix="/api/festivals", tags=["Festivals"])
app.include_router(community.router, prefix="/api/community", tags=["Community"])

@app.get("/")
def root():
    return {
        "message": "Welcome to DharoharAI API 🏛️",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "service": "DharoharAI"}