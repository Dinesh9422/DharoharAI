from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from typing import Optional, List
import google.generativeai as genai
import os

router = APIRouter()

# Seed data
MONUMENTS_DATA = [
    {"name": "Taj Mahal", "state": "Uttar Pradesh", "era": "Mughal • 1632 AD", "type": "Monument", "emoji": "🕌", "description": "Symbol of eternal love, UNESCO World Heritage Site", "entry_fee": "₹50 (Indians) / ₹1100 (Foreigners)", "timing": "6AM - 6:30PM", "latitude": 27.1751, "longitude": 78.0421},
    {"name": "Brihadeeswarar Temple", "state": "Tamil Nadu", "era": "Chola • 1010 AD", "type": "Temple", "emoji": "🛕", "description": "Masterpiece of Dravidian architecture, UNESCO Heritage Site", "entry_fee": "Free", "timing": "6AM - 8:30PM", "latitude": 10.7828, "longitude": 79.1318},
    {"name": "Hampi", "state": "Karnataka", "era": "Vijayanagara • 1336 AD", "type": "Ruins", "emoji": "🏛️", "description": "Ancient ruins of the mighty Vijayanagara Empire", "entry_fee": "₹40 (Indians)", "timing": "Sunrise - Sunset", "latitude": 15.3350, "longitude": 76.4600},
    {"name": "Qutub Minar", "state": "Delhi", "era": "Delhi Sultanate • 1193 AD", "type": "Monument", "emoji": "🗼", "description": "Tallest brick minaret in the world", "entry_fee": "₹40 (Indians)", "timing": "7AM - 5PM", "latitude": 28.5244, "longitude": 77.1855},
    {"name": "Konark Sun Temple", "state": "Odisha", "era": "Eastern Ganga • 1250 AD", "type": "Temple", "emoji": "☀️", "description": "13th century temple shaped as a giant chariot", "entry_fee": "₹40 (Indians)", "timing": "6AM - 8PM", "latitude": 19.8876, "longitude": 86.0945},
    {"name": "Ajanta Caves", "state": "Maharashtra", "era": "Satavahana • 2nd BC", "type": "Cave", "emoji": "🪨", "description": "Rock-cut Buddhist cave monuments with exquisite paintings", "entry_fee": "₹40 (Indians)", "timing": "9AM - 5:30PM", "latitude": 20.5519, "longitude": 75.7033},
    {"name": "Hawa Mahal", "state": "Rajasthan", "era": "Rajput • 1799 AD", "type": "Palace", "emoji": "🏰", "description": "Palace of Winds with iconic honeycomb facade", "entry_fee": "₹50 (Indians)", "timing": "9AM - 5PM", "latitude": 26.9239, "longitude": 75.8267},
    {"name": "Meenakshi Temple", "state": "Tamil Nadu", "era": "Pandya • 7th Century", "type": "Temple", "emoji": "🛕", "description": "Ancient Hindu temple with stunning Dravidian architecture", "entry_fee": "Free", "timing": "5AM - 12:30PM, 4PM - 10PM", "latitude": 9.9195, "longitude": 78.1193},
    {"name": "Gateway of India", "state": "Maharashtra", "era": "British • 1924 AD", "type": "Monument", "emoji": "🗿", "description": "Iconic arch monument overlooking the Arabian Sea", "entry_fee": "Free", "timing": "Always Open", "latitude": 18.9220, "longitude": 72.8347},
    {"name": "Khajuraho", "state": "Madhya Pradesh", "era": "Chandela • 950 AD", "type": "Temple", "emoji": "⛩️", "description": "UNESCO Heritage temples known for intricate sculptures", "entry_fee": "₹40 (Indians)", "timing": "Sunrise - Sunset", "latitude": 24.8318, "longitude": 79.9199},
]

def seed_monuments(db: Session):
    count = db.query(models.Monument).count()
    if count == 0:
        for m in MONUMENTS_DATA:
            monument = models.Monument(**m)
            db.add(monument)
        db.commit()

@router.get("/", response_model=List[schemas.MonumentResponse])
def get_monuments(
    state: Optional[str] = None,
    type: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    seed_monuments(db)
    query = db.query(models.Monument)
    if state:
        query = query.filter(models.Monument.state == state)
    if type:
        query = query.filter(models.Monument.type == type)
    if search:
        query = query.filter(
            models.Monument.name.ilike(f"%{search}%") |
            models.Monument.state.ilike(f"%{search}%")
        )
    return query.all()

@router.get("/{monument_id}", response_model=schemas.MonumentResponse)
def get_monument(monument_id: int, db: Session = Depends(get_db)):
    monument = db.query(models.Monument).filter(models.Monument.id == monument_id).first()
    if not monument:
        raise HTTPException(status_code=404, detail="Monument not found")
    return monument

@router.get("/{monument_id}/ai-story")
async def get_ai_story(monument_id: int, db: Session = Depends(get_db)):
    monument = db.query(models.Monument).filter(models.Monument.id == monument_id).first()
    if not monument:
        raise HTTPException(status_code=404, detail="Monument not found")

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-pro")
    prompt = f"Tell me an engaging story about {monument.name} in {monument.state}, India. Include historical facts, interesting legends, and architectural details. Keep it under 200 words."
    response = model.generate_content(prompt)
    return {"monument": monument.name, "story": response.text}