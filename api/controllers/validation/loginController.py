import jwt
from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.validationdir import validationOp as validationCrud
from schemas.userdir import user as userSchema
from models.userdir import userModel
from schemas.validationdir import validationSchema
from config.dependancies import get_db
from schemas.token import tokenSchema
from datetime import datetime, timedelta


router = APIRouter(
    prefix="/login",
    tags=["Validation"],
    responses={404: {"description": "User not found"}}
)


JWT_SECRET_KEY ="mysecretkey"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_TIME_MINUTES = 30

def create_jwt_token(name: str):
    expiration = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_TIME_MINUTES)
    payload = {"name": name, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return token

def validate_user(db: Session, user: validationSchema.UserValidation):
    db_user = db.query(userModel.User).filter(userModel.User.name == user.name).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return db_user.name

@router.post("/", response_model=tokenSchema.Token)
def login(user: validationSchema.UserValidation, db: Session = Depends(get_db)):
    name = validate_user(db, user)
    access_token = create_jwt_token(name)
    return {"access_token": access_token, "token_type": "bearer"}