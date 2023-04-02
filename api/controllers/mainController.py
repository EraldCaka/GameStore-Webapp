from fastapi import FastAPI
from models.userdir import userModel
from controllers.user import userController
from config.database import engine
from controllers.validation import  loginController, registerController 

userModel.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Users API", version="0.1.0")

#user controller router
app.include_router(userController.router)