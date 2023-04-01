from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from models import userModel
from operations import user
from controllers import userController
from schemas import user as schemas
from config.dependancies import get_db
from config.database import engine

userModel.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Users API", version="0.1.0")

@app.get("/users/", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return user.get_users(db)

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user