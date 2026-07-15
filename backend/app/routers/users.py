from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.auth import hash_password, verify_password, create_access_token, get_current_user
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check existing user
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create token
    token = create_access_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer", "user": new_user}

@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer", "user": db_user}

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.post("/bookmark", response_model=schemas.BookmarkResponse)
def add_bookmark(
    bookmark: schemas.BookmarkCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_bookmark = models.Bookmark(
        user_id=current_user.id,
        monument_id=bookmark.monument_id,
        monument_name=bookmark.monument_name
    )
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark

@router.get("/bookmarks")
def get_bookmarks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Bookmark).filter(models.Bookmark.user_id == current_user.id).all()

@router.post("/quiz-score", response_model=schemas.QuizScoreResponse)
def save_quiz_score(
    score_data: schemas.QuizScoreCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_score = models.QuizScore(
        user_id=current_user.id,
        score=score_data.score,
        total=score_data.total,
        badge=score_data.badge
    )
    # Update user points
    current_user.points += score_data.score * 100
    db.add(new_score)
    db.commit()
    db.refresh(new_score)
    return new_score

@router.get("/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    users = db.query(models.User).order_by(models.User.points.desc()).limit(10).all()
    return [{"rank": i+1, "name": u.name, "points": u.points, "avatar": u.avatar} for i, u in enumerate(users)]