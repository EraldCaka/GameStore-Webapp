from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.games import cart as libraryCrud
from schemas.games import cart as librarySchema
from config.dependancies import get_db
from typing import List

router = APIRouter(
    prefix="/cart",
    tags=["cart"],
    responses={404: {"description": "Game not found"}}
)

@router.get("/{game_id}", response_model=librarySchema.Cart)
def get_game(game_id: int, db: Session = Depends(get_db)):
    db_game = libraryCrud.get_game_by_id(db, game_id=game_id)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return db_game

@router.get("/", response_model=List[librarySchema.Cart])
def get_all_games(db: Session = Depends(get_db)):
    return libraryCrud.get_games(db)


@router.put("/{game_id}", response_model=librarySchema.Cart)
def update_game(game_id: int, game: librarySchema.ItemUpdate, db: Session = Depends(get_db)):
    return libraryCrud.update_game(db, game_id, game)


@router.delete("/{game_id}", response_model=librarySchema.Cart)
def delete_game(game_id: int, db: Session = Depends(get_db)):
    return libraryCrud.delete_game(db, game_id)


@router.post("/", response_model=librarySchema.Cart)
def create_game(game: librarySchema.ItemCreate, db: Session = Depends(get_db)):
    return libraryCrud.create_game(db, game)


@router.get("/user/{user_id}", response_model=List[librarySchema.Cart])
def get_all_games_by_user_id(user_id: int, db: Session = Depends(get_db)):
    return libraryCrud.get_games_by_user_id(db, user_id)


@router.get("/search/{search}", response_model=List[librarySchema.Cart])
def search_games(search: str, db: Session = Depends(get_db)):
    return libraryCrud.search_games(db, search)

@router.get("/search/entity/{search}", response_model=librarySchema.Cart)
def search_game(search: str, db: Session = Depends(get_db)):
    game = libraryCrud.search_game(db, search)
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    return game