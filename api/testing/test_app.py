
from fastapi.testclient import TestClient

from api.controllers.mainController import app

client = TestClient(app)

def test_user_by_id():
    response = client.get("/users/2")
    assert response.status_code == 200
    assert response.json() == {"msg": "User was found successfully"}

def test_user_by_id_fail():
    response = client.get("/users/100")
    assert response.status_code == 404
    assert response.json() == {"msg": "User was not found"}

def test_all_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert response.json() == {"msg": "Users were found successfully"}

def test_all_users_fail():
    response = client.get("/users")
    assert response.status_code == 404
    assert response.json() == {"msg": "Users were not found"}

# Game Tests
def test_game_by_id():
    response = client.get("/games/1")
    assert response.status_code == 200
    assert response.json() == {"msg": "Game was found successfully"}

def test_game_by_id_fail():
    response = client.get("/games/100")
    assert response.status_code == 404
    assert response.json() == {"msg": "Game was not found"}

def test_all_games():
    response = client.get("/games")
    assert response.status_code == 200
    assert response.json() == {"msg": "Games were found successfully"}

def test_all_games_fail():
    response = client.get("/games")
    assert response.status_code == 404
    assert response.json() == {"msg": "Games were not found"}