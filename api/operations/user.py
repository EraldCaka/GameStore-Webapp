from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas import user
from models.userModel import User



def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()