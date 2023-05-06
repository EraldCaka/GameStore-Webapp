from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas.userdir import user as userSchema
from models.userdir.userModel import User
from models.userdir.userModel import UserImage
from typing import List

#get user by id
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()

# get all users
def get_users(db: Session):
    return db.query(User).all()



# update user
def update_user(db: Session, user: userSchema.UserUpdate, user_id: int):
    db_user = db.query(User).filter(User.user_id == user_id).first()
 
    if user.name is not None:
        db_user.name = user.name
    if user.password is not None:
       db_user.password= user.password
    if user.email is not None:
        db_user.email = user.email
    if user.type is not None:
        db_user.type = user.type
    #for key, value in user.dict().items():
        #if value is not None:
          #  setattr(db_user, key, value)
    if db_user is  None:
        raise HTTPException(status_code=404, detail="User not found")
    db.commit()
    db.refresh(db_user)
    return db_user

# delete user
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user


def search_users(db: Session, search: str):
    return db.query(User).filter(User.name.like(f"%{search}%")).all()

def create_user_image(db: Session, user_image_data: userSchema.UserImageCreate):
    db_user_image = db.query(UserImage).filter_by(name=user_image_data.name).first()
    if db_user_image:
        raise HTTPException(status_code=400, detail="User image with this name already exists")
    db_user_image = UserImage(**user_image_data.dict())
    db.add(db_user_image)
    db.commit()
    db.refresh(db_user_image)
    return db_user_image

def get_user_image_by_name(db: Session, name: str):
    db_user_image = db.query(UserImage).filter_by(name=name).first()
    if db_user_image is None:
        raise HTTPException(status_code=404, detail="User image not found")

    image_data = db_user_image.image
    
    return userSchema.UserImage(name=db_user_image.name, image=image_data , user_id = db_user_image.user_id)