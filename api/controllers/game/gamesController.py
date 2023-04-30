from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.games import games_def as gamesCrud
from schemas.games import games as gamesSchema
from config.dependancies import get_db
from typing import List

router = APIRouter(
    prefix="/games",
    tags=["Games"],
    responses={404: {"description": "Game not found"}}
)




@router.get("/{game_id}", response_model=gamesSchema.Games)
def get_game(game_id: int, db: Session = Depends(get_db)):
    db_game = gamesCrud.get_game_by_id(db, game_id=game_id)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return db_game


@router.get("/", response_model=List[gamesSchema.Games])
def get_all_games(db: Session = Depends(get_db)):
    return gamesCrud.get_games(db)




@router.put("/{game_id}", response_model=gamesSchema.Games)
def update_game(game_id: int, game: gamesSchema.GameUpdate, db: Session = Depends(get_db)):
    return gamesCrud.update_game(db, game_id, game)




@router.delete("/{game_id}", response_model=gamesSchema.Games)
def delete_game(game_id: int, db: Session = Depends(get_db)):
    return gamesCrud.delete_game(db, game_id)




@router.post("/", response_model=gamesSchema.Games)
def create_game(game: gamesSchema.GameCreate, db: Session = Depends(get_db)):
    return gamesCrud.create_game(db, game)


@router.get("/search/{search}", response_model=List[gamesSchema.Games])
def search_games(search: str, db: Session = Depends(get_db)):
    return gamesCrud.search_games(db, search)


@router.get("/search/genre/{genre}", response_model=List[gamesSchema.Games])
def search_games_by_genre(genre: str, db: Session = Depends(get_db)):
    return gamesCrud.search_games_by_genre(db, genre)