from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String,LargeBinary
from sqlalchemy.orm import relationship

from config.database import Base



class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, unique=True)
    password = Column(String)
    email = Column(String)
    type = Column(String)

    library = relationship("Library", back_populates="user", cascade="all, delete")
    wishlist = relationship("Wishlist", back_populates="user", cascade="all, delete")
    user_image = relationship("UserImage", back_populates="user",uselist=False, cascade="all, delete")
    cart = relationship("Cart", back_populates="user", cascade="all, delete")

class UserImage(Base):
    __tablename__ = "user_image"
    user_id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, ForeignKey(User.name))
    image = Column(LargeBinary)

    user = relationship("User", back_populates="user_image")



class Game(Base):
    __tablename__ = "game"
    
    game_id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, unique=True)
    price = Column(Float)
    description = Column(String)
    genre = Column(String)
    rating = Column(Float)
    release_date = Column(String)
    publisher = Column(String)


    game_image = relationship("GameImage", back_populates="game",uselist=False, cascade="all, delete")
    library = relationship("Library", back_populates="game", cascade="all, delete")
    wishlist = relationship("Wishlist", back_populates="game", cascade="all, delete")
    cart = relationship("Cart", back_populates="game", cascade="all, delete")
    
    

class Library(Base):
    __tablename__ = "library"
    
    game_id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String, ForeignKey(Game.name))
    
    user = relationship("User", back_populates="library")
    game = relationship("Game", back_populates="library")


class GameImage(Base):
    __tablename__ = "game_image"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, ForeignKey(Game.name))
    image = Column(LargeBinary)
    
    game = relationship("Game", back_populates="game_image")



class Wishlist(Base):
    __tablename__ = "wishlist"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String, ForeignKey(Game.name))
    
    user = relationship("User", back_populates="wishlist")
    game = relationship("Game", back_populates="wishlist")
    

class Cart(Base):
    __tablename__ = "cart"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.user_id))
    game_name = Column(String, ForeignKey(Game.name))
    
    user = relationship("User", back_populates="cart")
    game = relationship("Game", back_populates="cart")       