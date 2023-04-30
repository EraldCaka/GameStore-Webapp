from fastapi import FastAPI
from models.userdir import userModel
from controllers.user import userController
from config.database import engine
from controllers.validation import  loginController, registerController 
from controllers.game import gamesController , library
from fastapi.middleware.cors import CORSMiddleware
from starlette import status

userModel.Base.metadata.create_all(bind=engine)

app = FastAPI(title="GameStore API", version="0.1.0")
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
