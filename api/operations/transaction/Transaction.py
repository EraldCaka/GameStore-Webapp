from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import List
from schemas.games import transactions
from models.userdir.userModel import Transaction

def get_transaction_by_id(db: Session, transaction_id: int):
    return db.query(Transaction).filter(Transaction.id == transaction_id).first()

def get_transactions(db: Session):
    return db.query(Transaction).all()

def create_transaction(db: Session, transaction: transactions.TransactionCreate):
    db_transaction = Transaction(**transaction.dict())
    if db.query(Transaction).filter(Transaction.user_id == transaction.user_id, Transaction.game_name == transaction.game_name).first():
        raise HTTPException(status_code=400, detail="Transaction already exists")
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transactions_by_user(db: Session, user_id: int):
    return db.query(Transaction).filter(Transaction.user_id == user_id).all()