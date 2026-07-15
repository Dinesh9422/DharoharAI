from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter()

FESTIVALS = [
    {"id": 1, "name": "Pongal", "state": "Tamil Nadu", "month": "January", "emoji": "🌾", "color": "#FFD700", "description": "Harvest festival celebrating the Sun God and nature's bounty", "duration": "4 days", "type": "Harvest"},
    {"id": 2, "name": "Republic Day", "state": "All India", "month": "January", "emoji": "🇮🇳", "color": "#FF9933", "description": "Celebrates the constitution of India coming into effect", "duration": "1 day", "type": "National"},
    {"id": 3, "name": "Holi", "state": "All India", "month": "March", "emoji": "🎨", "color": "#FF69B4", "description": "Festival of colors celebrating the victory of good over evil", "duration": "2 days", "type": "Cultural"},
    {"id": 4, "name": "Ugadi", "state": "Karnataka/Andhra", "month": "March", "emoji": "🌸", "color": "#90EE90", "description": "Telugu and Kannada New Year celebration", "duration": "1 day", "type": "New Year"},
    {"id": 5, "name": "Ram Navami", "state": "All India", "month": "April", "emoji": "🏹", "color": "#FFA500", "description": "Birth anniversary of Lord Rama", "duration": "1 day", "type": "Religious"},
    {"id": 6, "name": "Eid ul-Fitr", "state": "All India", "month": "April", "emoji": "🌙", "color": "#00CED1", "description": "End of Ramadan — festival of breaking the fast", "duration": "3 days", "type": "Religious"},
    {"id": 7, "name": "Buddha Purnima", "state": "All India", "month": "May", "emoji": "☸️", "color": "#FFD700", "description": "Birth anniversary of Gautama Buddha", "duration": "1 day", "type": "Religious"},
    {"id": 8, "name": "Rath Yatra", "state": "Odisha", "month": "June", "emoji": "🎡", "color": "#FF6347", "description": "Grand chariot festival of Lord Jagannath in Puri", "duration": "9 days", "type": "Cultural"},
    {"id": 9, "name": "Independence Day", "state": "All India", "month": "August", "emoji": "🇮🇳", "color": "#FF9933", "description": "Celebrates India's independence from British rule in 1947", "duration": "1 day", "type": "National"},
    {"id": 10, "name": "Onam", "state": "Kerala", "month": "August", "emoji": "🌺", "color": "#32CD32", "description": "Harvest festival of Kerala celebrating King Mahabali's return", "duration": "10 days", "type": "Harvest"},
    {"id": 11, "name": "Ganesh Chaturthi", "state": "Maharashtra", "month": "September", "emoji": "🐘", "color": "#FFA500", "description": "Birthday of Lord Ganesha — remover of obstacles", "duration": "10 days", "type": "Religious"},
    {"id": 12, "name": "Navratri", "state": "All India", "month": "October", "emoji": "💃", "color": "#FF69B4", "description": "Nine nights of worship dedicated to Goddess Durga", "duration": "9 days", "type": "Religious"},
    {"id": 13, "name": "Dussehra", "state": "All India", "month": "October", "emoji": "🏹", "color": "#FF4500", "description": "Victory of Lord Rama over Ravana — good over evil", "duration": "1 day", "type": "Cultural"},
    {"id": 14, "name": "Diwali", "state": "All India", "month": "October", "emoji": "🪔", "color": "#FFD700", "description": "Festival of Lights — victory of light over darkness", "duration": "5 days", "type": "Cultural"},
    {"id": 15, "name": "Chhath Puja", "state": "Bihar/UP", "month": "November", "emoji": "☀️", "color": "#FFA500", "description": "Worship of Sun God and Chhathi Maiya", "duration": "4 days", "type": "Religious"},
    {"id": 16, "name": "Christmas", "state": "All India", "month": "December", "emoji": "🎄", "color": "#32CD32", "description": "Celebration of the birth of Jesus Christ", "duration": "1 day", "type": "Religious"},
]

@router.get("/")
def get_festivals(
    month: Optional[str] = None,
    type: Optional[str] = None,
    state: Optional[str] = None
):
    result = FESTIVALS
    if month:
        result = [f for f in result if f["month"].lower() == month.lower()]
    if type:
        result = [f for f in result if f["type"].lower() == type.lower()]
    if state:
        result = [f for f in result if state.lower() in f["state"].lower()]
    return result

@router.get("/{festival_id}")
def get_festival(festival_id: int):
    festival = next((f for f in FESTIVALS if f["id"] == festival_id), None)
    if not festival:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Festival not found")
    return festival