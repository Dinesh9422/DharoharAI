from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# MongoDB
MONGODB_URL = os.getenv("MONGODB_URL")
mongo_client = AsyncIOMotorClient(MONGODB_URL)
mongo_db = mongo_client.dharoharai

# Collections
monuments_collection = mongo_db["monuments"]
community_collection = mongo_db["community"]
festivals_collection = mongo_db["festivals"]