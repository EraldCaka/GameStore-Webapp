from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from schemas.games import library as librarySchema
from models.userdir.userModel import Library



def get_game_by_id(db: Session, game_id: int):
    return db.query(Library).filter(Library.game_id == game_id).first()



def get_games(db: Session):
    return db.query(Library).all()



def create_game(db: Session, game: librarySchema.ItemCreate):
    db_game = Library(**game.dict())
    if db.query(Library).filter(Library.game_name == game.game_name).first() is not None:
        raise HTTPException(status_code=400, detail="Game already exists")
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game



def update_game(db: Session, game_id: int, game: librarySchema.ItemUpdate):
    db_game = db.query(Library).filter(Library.game_id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    update_data = game.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_game, key, value)
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game



def delete_game(db: Session, game_id: int):
    db_game = db.query(Library).filter(Library.game_id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    db.delete(db_game)
    db.commit()
    return db_game



def get_games_by_user_id(db: Session, user_id: int):
    return db.query(Library).filter(Library.user_id == user_id).all()


def search_games(db: Session, search: str):
    return db.query(Library).filter(Library.game_name.like(f"%{search}%")).all()

