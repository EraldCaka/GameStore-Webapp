from datetime import datetime, timedelta
from typing import Optional

from pydantic import BaseModel

class TokenPayload(BaseModel):
    sub: Optional[int] = None
    exp: Optional[datetime] = None

class Token(BaseModel):
    access_token: str
    token_type: Optional[str] = "bearer"