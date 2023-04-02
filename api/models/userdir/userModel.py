from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from config.database import Base



class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, unique=True)
    password = Column(String)
    email = Column(String)
    type = Column(String)


