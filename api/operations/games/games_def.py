from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from schemas.games import games as gamesSchema
from models.userdir.userModel import Game
from models.userdir.userModel import GameImage
import base64

def get_game_by_id(db: Session, game_id: int):
    return db.query(Game).filter(Game.game_id == game_id).first()


def get_games(db: Session):
    return db.query(Game).all()


def create_game_image(db: Session, game_image_data: gamesSchema.GameImageCreate):
    db_game_image = db.query(GameImage).filter_by(name=game_image_data.name).first()
    if db_game_image:
        raise HTTPException(status_code=400, detail="Game image with this name already exists")
    
    db_game_image = GameImage(**game_image_data.dict())
    db.add(db_game_image)
    db.commit()
    db.refresh(db_game_image)
    return db_game_image

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


def create_game(db: Session, game: gamesSchema.GameCreate):
    db_game = Game(**game.dict())
    if db.query(Game).filter(Game.name == game.name).first() is not None:
        raise HTTPException(status_code=400, detail="Game already exists")
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game


def get_game_image_by_name(db: Session, game_name: str):
    db_game_image = db.query(GameImage).filter_by(name=game_name).first()
    if db_game_image is None:
        raise HTTPException(status_code=404, detail="Game image not found")

    image_data = db_game_image.image

    return gamesSchema.GameImage(name=db_game_image.name, image=image_data , id = db_game_image.id)