import { useEffect, useState } from "react";
import { apiCall } from "../../../axios/axios";
import { NavbarLine } from "../index";
import GameCard from "./GameCard";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const GamesWrapper = styled.div`
  text-align: center;
`;

const SearchInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  margin-bottom: 20px;
`;

const AddGameButton = styled.button`
  margin-right: 20px;
  background-color: #a8e6c8;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Games = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiCall("/games").fetchAll();
        setGames(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGame = () => {
    console.log("Add Game clicked");
    navigate("/games/add");
  };

  return (
    <GamesWrapper>
      <NavbarLine />
      <AddGameButton onClick={handleAddGame}>Add Game</AddGameButton>
      <SearchInput
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {filteredGames.map((game) => (
          <GameCard key={game.game_id} game={game} />
        ))}
      </div>
    </GamesWrapper>
  );
};

export default Games;
