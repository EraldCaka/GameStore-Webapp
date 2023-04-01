from typing import Optional

from pydantic import BaseModel


class UserBase(BaseModel):
    name : int
    password : str
    email : str
    type : str

class UserCreate(UserBase):
    pass 

class UserUpdate(BaseModel):
    name : Optional [int]
    password : Optional [str]
    email : Optional [str]
    type : Optional [str]

class User(UserBase):
    user_id:int
    class config:
        orm_mode = True     #Auto Increments the id

