import datetime
from pydantic import BaseModel

class TransactionBase(BaseModel):
    user_id:int
    game_name: str
    price: int
    date: datetime.datetime
  

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    class Config:
        orm_mode = True