from fastapi import Depends, HTTPException,APIRouter, File, UploadFile,Request
from sqlalchemy.orm import Session
from operations.userdir import user as userCrud
from schemas.userdir import user as userSchema
from config.dependancies import get_db
from typing import List
import base64
from typing import List
router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "User not found"}}
)




@router.get("/{user_id}", response_model=userSchema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = userCrud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/search/entity/{name}", response_model=userSchema.User)
def read_users(name: str, db: Session = Depends(get_db)):
    db_user = userCrud.search_users_correctly(db, name)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/", response_model=List[userSchema.User])
def get_all_users(db: Session = Depends(get_db)):
    return userCrud.get_users(db)



@router.put("/{user_id}", response_model=userSchema.User)
def update_user(user_id: int, user: userSchema.UserUpdate, db: Session = Depends(get_db)):
    return userCrud.update_user(db, user, user_id)



@router.delete("/{user_id}", response_model=userSchema.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return userCrud.delete_user(db, user_id)


@router.get("/search/{search}", response_model=List[userSchema.User])
def search_users(search: str,db: Session = Depends(get_db)):
    return userCrud.search_users(db, search)




@router.post("/images/send/{name}", response_model=userSchema.UserImage)
def create_user_image(name: str, image: UploadFile = File(...), db: Session = Depends(get_db)):
    
    user_image = userSchema.UserImageCreate(name=name, image=image.file.read())
    
    db_user_image = userCrud.create_user_image(db, user_image)
    db_user_image.image = base64.b64encode(db_user_image.image).decode('utf-8')
    
    return db_user_image

@router.get("/images/{name}", response_model=userSchema.UserImage)
def get_user_image_by_name(name: str, db: Session = Depends(get_db)):
    user_image = userCrud.get_user_image_by_name(db, name)
    if not user_image:
        raise HTTPException(status_code=404, detail="Game image not found")
    
    user_image.image = base64.b64encode(user_image.image).decode('utf-8')
    return user_image

