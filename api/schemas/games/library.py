from typing import Optional
from pydantic import BaseModel


class LibraryBase(BaseModel):
    user_id: int
    game_name: str
   


class ItemCreate(LibraryBase):
    pass


class ItemUpdate(LibraryBase):
    user_id: Optional[int]= None
    game_name: Optional[str]= None


class Library(LibraryBase):
    game_id: int

    class Config:
        orm_mode = True
