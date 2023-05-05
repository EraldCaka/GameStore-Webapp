from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    password: str
    email: str
    type: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    name: Optional[str] = None
    password: Optional[str] = None
    email: Optional[str] = None
    type: Optional[str] = None


class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True


class UserImageBase(BaseModel):
    name: str
    image: Optional[bytes]


class UserImageCreate(UserImageBase):
    pass






class UserImage(UserImageBase):
    user_id: int

    class Config:
        orm_mode = True