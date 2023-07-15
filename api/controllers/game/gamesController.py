from fastapi import Depends, HTTPException,APIRouter, File, UploadFile
from sqlalchemy.orm import Session
import base64
from operations.games import games_def as gamesCrud
from schemas.games import games as gamesSchema
from config.dependancies import get_db
from typing import List
from models.userdir import userModel as gameModel
import base64





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

@router.post("/images/{name}", response_model=gamesSchema.GameImage)
def create_game_image(name: str, image: UploadFile = File(...), db: Session = Depends(get_db)):
    game_image = gamesSchema.GameImageCreate(name=name, image=image.file.read())
    db_game_image = gamesCrud.create_game_image(db, game_image)
    db_game_image.image = base64.b64encode(db_game_image.image).decode('utf-8')
    
    return db_game_image

@router.get("/image/{name}", response_model=gamesSchema.GameImage)
def get_game_image_by_name(name: str, db: Session = Depends(get_db)):
    game_image = gamesCrud.get_game_image_by_name(db, name)
    if not game_image:
        raise HTTPException(status_code=404, detail="Game image not found")
    game_image.image = base64.b64encode(game_image.image).decode('utf-8')
    return game_image

@router.patch("/images/update/{name}", response_model=gamesSchema.GameImage)
def update_game_image_by_name(name: str, image: UploadFile = File(...), db: Session = Depends(get_db)):
    game_image = gamesSchema.GameImageCreate(name=name, image=image.file.read())
    db_game_image = gamesCrud.update_game_image(db, game_image)
    db_game_image.image = base64.b64encode(db_game_image.image).decode('utf-8')
    return db_game_image
