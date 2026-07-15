from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User Schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    avatar: str
    points: int
    streak: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Monument Schemas
class MonumentCreate(BaseModel):
    name: str
    state: str
    era: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    entry_fee: Optional[str] = None
    timing: Optional[str] = None
    emoji: Optional[str] = "🏛️"

class MonumentResponse(MonumentCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Bookmark Schemas
class BookmarkCreate(BaseModel):
    monument_id: str
    monument_name: str

class BookmarkResponse(BookmarkCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Quiz Schemas
class QuizScoreCreate(BaseModel):
    score: int
    total: int
    badge: Optional[str] = None

class QuizScoreResponse(QuizScoreCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Community Schemas
class PostCreate(BaseModel):
    content: str
    location: Optional[str] = None
    emoji: Optional[str] = "🏛️"

class PostResponse(BaseModel):
    id: str
    user_name: str
    user_avatar: str
    content: str
    location: Optional[str]
    emoji: str
    likes: int
    created_at: datetime