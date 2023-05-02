from typing import Optional
from pydantic import BaseModel


class GameBase(BaseModel):
    name: str
    price: int
    description: str
    genre: str
    rating: float
    release_date: str
    publisher: str


class GameCreate(GameBase):
    pass


class GameUpdate(GameBase):
    name: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = None
    release_date: Optional[str] = None
    publisher: Optional[str] = None
  


class Games(GameBase):
    game_id: int
    #incremental id for each game
    class Config:
        orm_mode = True

class GameImageBase(BaseModel):
     name: str
     image: Optional[bytes]

class GameImageCreate(GameImageBase):
    pass

class GameImage(GameImageBase):
    id: int

    class Config:
        orm_mode = True