from fastapi import Depends, HTTPException,APIRouter
from sqlalchemy.orm import Session
from operations.transaction import Transaction 
from schemas.games import transactions as tSchema
from config.dependancies import get_db
from typing import List

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"],
    responses={404: {"description": "Transaction not found"}}
)

@router.get("/{transaction_id}", response_model=tSchema.Transaction)
def get_game(transaction_id: int, db: Session = Depends(get_db)):
    db_game = Transaction.get_transaction_by_id(db, transaction_id=transaction_id)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_game

@router.get("/", response_model=List[tSchema.Transaction])
def get_games(db: Session = Depends(get_db)):
    return Transaction.get_transactions(db)

@router.post("/", response_model=tSchema.Transaction)
def create_game(transaction: tSchema.TransactionCreate, db: Session = Depends(get_db)):
    return Transaction.create_transaction(db, transaction)

@router.get("/user/{user_id}", response_model=List[tSchema.Transaction])
def get_all_games_by_user_id(user_id: int, db: Session = Depends(get_db)):
    return Transaction.get_transactions_by_user(db, user_id)
