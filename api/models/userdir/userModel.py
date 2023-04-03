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

    library = relationship("Library", back_populates="user")

class Library(Base):
    __tablename__ = "library"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String)
    
    user = relationship("User", back_populates="library")


class Cart(Base):
    __tablename__ = "cart"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String)
    
    user = relationship("User", back_populates="cart")

class Wishlist(Base):
    __tablename__ = "wishlist"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String)
    
    user = relationship("User", back_populates="wishlist")

class Game(Base):
    __tablename__ = "game"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    game_name = Column(String)
    price = Column(Float)
    description = Column(String)
    genre = Column(String)
    rating = Column(Float)
    platform = Column(String)
    release_date = Column(String)
    publisher = Column(String)
    developer = Column(String)
    image = Column(String)