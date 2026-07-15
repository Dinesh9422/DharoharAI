from fastapi import APIRouter, Depends, HTTPException
from app.database import community_collection
from app.auth import get_current_user
from app import models
from datetime import datetime
from bson import ObjectId
from typing import Optional

router = APIRouter()

def serialize_post(post):
    post["id"] = str(post["_id"])
    del post["_id"]
    return post

@router.get("/posts")
async def get_posts(skip: int = 0, limit: int = 20):
    posts = []
    async for post in community_collection.find().sort("created_at", -1).skip(skip).limit(limit):
        posts.append(serialize_post(post))
    return posts

@router.post("/posts")
async def create_post(
    content: str,
    location: Optional[str] = None,
    emoji: Optional[str] = "🏛️",
    current_user: models.User = Depends(get_current_user)
):
    post = {
        "user_id": current_user.id,
        "user_name": current_user.name,
        "user_avatar": current_user.avatar,
        "content": content,
        "location": location,
        "emoji": emoji,
        "likes": 0,
        "liked_by": [],
        "comments": [],
        "created_at": datetime.utcnow()
    }
    result = await community_collection.insert_one(post)
    post["id"] = str(result.inserted_id)
    del post["_id"]
    return post

@router.post("/posts/{post_id}/like")
async def like_post(
    post_id: str,
    current_user: models.User = Depends(get_current_user)
):
    post = await community_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    user_id = current_user.id
    if user_id in post.get("liked_by", []):
        await community_collection.update_one(
            {"_id": ObjectId(post_id)},
            {"$inc": {"likes": -1}, "$pull": {"liked_by": user_id}}
        )
        return {"liked": False}
    else:
        await community_collection.update_one(
            {"_id": ObjectId(post_id)},
            {"$inc": {"likes": 1}, "$push": {"liked_by": user_id}}
        )
        return {"liked": True}

@router.delete("/posts/{post_id}")
async def delete_post(
    post_id: str,
    current_user: models.User = Depends(get_current_user)
):
    post = await community_collection.find_one({"_id": ObjectId(post_id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post["user_id"] != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    await community_collection.delete_one({"_id": ObjectId(post_id)})
    return {"message": "Post deleted"}

@router.get("/leaderboard")
async def get_leaderboard():
    pipeline = [
        {"$group": {"_id": "$user_name", "posts": {"$sum": 1}, "total_likes": {"$sum": "$likes"}}},
        {"$sort": {"total_likes": -1}},
        {"$limit": 10}
    ]
    result = []
    async for doc in community_collection.aggregate(pipeline):
        result.append({"user": doc["_id"], "posts": doc["posts"], "likes": doc["total_likes"]})
    return result