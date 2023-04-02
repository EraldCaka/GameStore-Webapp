from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas.userdir import user as userSchema
from schemas.validationdir import validationSchema 
from models.userdir.userModel import User
from typing import List

# create user (register)
def create_user(db: Session, user: userSchema.UserCreate):
    db_user = User(**user.dict())
    if db.query(User).filter(User.name == user.name).first() is not None:
        raise HTTPException(status_code=400, detail="User already exists")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def validate_user(db: Session, user: validationSchema.UserValidation):
    db_user = db.query(User).filter(User.name == user.name).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return validationSchema.UserValidation(name=db_user.name, password=db_user.password)