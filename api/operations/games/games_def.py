from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from schemas.games import games as gamesSchema
from models.userdir.userModel import Game


def get_game_by_id(db: Session, game_id: int):
    return db.query(Game).filter(Game.game_id == game_id).first()


def get_games(db: Session):
    return db.query(Game).all()



def create_game(db: Session, game: gamesSchema.GameCreate):
    db_game = Game(**game.dict())
    if db.query(Game).filter(Game.name == game.name).first() is not None:
        raise HTTPException(status_code=400, detail="Game already exists")
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game


def update_game(db: Session, game_id: int, game: gamesSchema.GameUpdate):
    db_game = db.query(Game).filter(Game.game_id == game_id).first()
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
    db_game = db.query(Game).filter(Game.game_id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    db.delete(db_game)
    db.commit()
    return db_game


def search_games(db: Session, search: str):
    return db.query(Game).filter(Game.name.like(f"%{search}%")).all()



def search_games_by_genre(db: Session, search: str):
    return db.query(Game).filter(Game.genre.like(f"%{search}%")).all()