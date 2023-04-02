from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.validationdir import validationOp as validationCrud
from schemas.userdir import user as userSchema
from config.dependancies import get_db
from typing import List

router = APIRouter(
    prefix="/register",
    tags=["Validation"],
    responses={404: {"description": "User not found"}}
)


@router.post("/", response_model=userSchema.User)
def register(user: userSchema.UserBase, db: Session = Depends(get_db)):
    return validationCrud.create_user(db, user)

