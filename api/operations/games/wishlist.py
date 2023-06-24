from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from schemas.games import wishlist as librarySchema
from models.userdir.userModel import Wishlist

def get_game_by_id(db: Session, game_id: int):
    return db.query(Wishlist).filter(Wishlist.id == game_id).first()

def get_games(db: Session):
    return db.query(Wishlist).all()

def create_game(db: Session, game: librarySchema.ItemCreate):
    db_game = Wishlist(**game.dict())
    if db.query(Wishlist).filter(Wishlist.user_id == game.user_id, Wishlist.game_name == game.game_name).first():
        print(game.user_id,"inside")
        print(db.query(Wishlist).filter(Wishlist.user_id== game.user_id).first())
        print(db.query(Wishlist).filter(Wishlist.game_name == game.game_name).first() and db.query(Wishlist).filter(Wishlist.user_id== game.user_id).first())
        print(db.query(Wishlist).filter(Wishlist.user_id == game.user_id).first().user_id)
        print(db.query(Wishlist).filter(Wishlist.user_id == game.user_id).first().game_name)
        raise HTTPException(status_code=400, detail="Game already exists")
    
    print(game.user_id)
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

def update_game(db: Session, game_id: int, game: librarySchema.ItemUpdate):
    db_game = db.query(Wishlist).filter(Wishlist.id == game_id).first()
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
    db_game = db.query(Wishlist).filter(Wishlist.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    db.delete(db_game)
    db.commit()
    return db_game

def get_games_by_user_id(db: Session, user_id: int):
    return db.query(Wishlist).filter(Wishlist.user_id == user_id).all()

def search_games(db: Session, search: str):
    return db.query(Wishlist).filter(Wishlist.game_name.like(f"%{search}%")).all()