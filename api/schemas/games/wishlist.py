from typing import Optional
from pydantic import BaseModel


class WishlistBase(BaseModel):
    user_id: int
    game_name: str
   


class ItemCreate(WishlistBase):
    pass


class ItemUpdate(WishlistBase):
    user_id: Optional[int]= None
    game_name: Optional[str]= None


class Wishlist(WishlistBase):
    id: int

    class Config:
        orm_mode = True
