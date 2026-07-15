from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

router = APIRouter()

QUESTIONS = [
    {"id": 1, "question": "Which dynasty built the Brihadeeswarar Temple?", "options": ["Pallava", "Chola", "Pandya", "Chera"], "answer": 1, "fact": "The Brihadeeswarar Temple was built by Raja Raja Chola I in 1010 AD!"},
    {"id": 2, "question": "Taj Mahal was built by which Mughal Emperor?", "options": ["Akbar", "Humayun", "Shah Jahan", "Aurangzeb"], "answer": 2, "fact": "Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal!"},
    {"id": 3, "question": "Hampi was the capital of which empire?", "options": ["Maurya", "Gupta", "Vijayanagara", "Maratha"], "answer": 2, "fact": "Hampi was the capital of the mighty Vijayanagara Empire (1336-1646 AD)!"},
    {"id": 4, "question": "Which UNESCO site is known as the 'Black Pagoda'?", "options": ["Ajanta Caves", "Konark Sun Temple", "Khajuraho", "Sanchi Stupa"], "answer": 1, "fact": "Konark Sun Temple is called the Black Pagoda by European sailors!"},
    {"id": 5, "question": "Ajanta Caves are located in which state?", "options": ["Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh"], "answer": 2, "fact": "Ajanta Caves are in Aurangabad district of Maharashtra!"},
    {"id": 6, "question": "Which is the oldest living city in India?", "options": ["Delhi", "Patna", "Varanasi", "Ayodhya"], "answer": 2, "fact": "Varanasi (Kashi) is one of the world's oldest continuously inhabited cities!"},
    {"id": 7, "question": "Kathakali is a classical dance form from which state?", "options": ["Tamil Nadu", "Odisha", "Kerala", "Andhra Pradesh"], "answer": 2, "fact": "Kathakali is a classical dance-drama from Kerala!"},
    {"id": 8, "question": "The Gateway of India was built to commemorate the visit of?", "options": ["Queen Victoria", "King George V", "Lord Mountbatten", "Prince Charles"], "answer": 1, "fact": "Gateway of India was built for the visit of King George V in 1911!"},
    {"id": 9, "question": "Which festival is known as the 'Festival of Lights'?", "options": ["Holi", "Diwali", "Navratri", "Pongal"], "answer": 1, "fact": "Diwali, the Festival of Lights, symbolizes the victory of light over darkness!"},
    {"id": 10, "question": "Meenakshi Temple is located in which city?", "options": ["Chennai", "Trichy", "Madurai", "Coimbatore"], "answer": 2, "fact": "The magnificent Meenakshi Amman Temple is in Madurai, Tamil Nadu!"},
]

BADGES = [
    {"min": 0, "max": 3, "title": "Heritage Seeker", "emoji": "🌱"},
    {"min": 4, "max": 6, "title": "Culture Explorer", "emoji": "🗺️"},
    {"min": 7, "max": 8, "title": "Heritage Scholar", "emoji": "📚"},
    {"min": 9, "max": 10, "title": "Dharohar Legend", "emoji": "👑"},
]

@router.get("/questions")
def get_questions():
    # Don't send answer to frontend
    questions = []
    for q in QUESTIONS:
        questions.append({
            "id": q["id"],
            "question": q["question"],
            "options": q["options"],
        })
    return questions

@router.post("/submit")
def submit_quiz(answers: dict, db: Session = Depends(get_db)):
    score = 0
    results = []
    for q in QUESTIONS:
        user_answer = answers.get(str(q["id"]))
        correct = user_answer == q["answer"]
        if correct:
            score += 1
        results.append({
            "id": q["id"],
            "correct": correct,
            "correct_answer": q["answer"],
            "fact": q["fact"]
        })

    badge = next((b for b in BADGES if b["min"] <= score <= b["max"]), BADGES[0])

    return {
        "score": score,
        "total": len(QUESTIONS),
        "badge": badge,
        "results": results
    }

@router.get("/leaderboard")
def get_quiz_leaderboard(db: Session = Depends(get_db)):
    scores = db.query(models.QuizScore).order_by(
        models.QuizScore.score.desc()
    ).limit(10).all()
    return scores