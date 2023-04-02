from typing import Optional
from pydantic import BaseModel

class UserValidation(BaseModel):
    name: str
    password: str
