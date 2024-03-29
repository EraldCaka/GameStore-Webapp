from fastapi import FastAPI
from models.userdir import userModel
from controllers.user import userController
from config.database import engine
#from config.fake_db import engine  #fake database for testing purposes
from controllers.validation import  loginController, registerController 
from controllers.game import gamesController , library, wishlist,cart
from controllers.transactions import Transaction
from fastapi.middleware.cors import CORSMiddleware
from starlette import status
from fastapi.testclient import TestClient

userModel.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GameStore API", version="0.2.2")
origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#user controller router
app.include_router(userController.router)
app.include_router(loginController.router)
app.include_router(registerController.router)
app.include_router(gamesController.router)
app.include_router(library.router)
app.include_router(wishlist.router)
app.include_router(cart.router)
app.include_router(Transaction.router)

