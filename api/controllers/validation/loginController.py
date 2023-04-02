from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.validationdir import validationOp as validationCrud
from schemas.userdir import user as userSchema
from schemas.validationdir import validationSchema
from config.dependancies import get_db
from typing import List
router = APIRouter(
    prefix="/login",
    tags=["Validation"],
    responses={404: {"description": "User not found"}}
)

@router.post("/", response_model=validationSchema.UserValidation)
def validate_user(user: validationSchema.UserValidation, db: Session = Depends(get_db)):
    return validationCrud.validate_user(db, user)