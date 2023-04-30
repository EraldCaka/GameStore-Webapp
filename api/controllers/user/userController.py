from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.userdir import user as userCrud
from schemas.userdir import user as userSchema
from config.dependancies import get_db
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
def search_users(search: str, db: Session = Depends(get_db)):
    return userCrud.search_users(db, search)