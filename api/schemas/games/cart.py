from typing import Optional
from pydantic import BaseModel


class CartBase(BaseModel):
    user_id: int
    game_name: str
   


class ItemCreate(CartBase):
    pass


class ItemUpdate(CartBase):
    user_id: Optional[int]= None
    game_name: Optional[str]= None


class Cart(CartBase):
    id: int

    class Config:
        orm_mode = True
