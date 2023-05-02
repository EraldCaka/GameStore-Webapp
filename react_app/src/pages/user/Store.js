import { useEffect, useState } from "react";
import { NavbarLine } from "../style/";
import Game from "../store/Game";
import { apiCall } from "../../axios/axios";
import styled from "styled-components";
const Wrapper = styled.aside`
  .our-games {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const Store = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    const response = await apiCall("/games").fetchAll();
    setGames(response.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <Wrapper>
        <NavbarLine />
        <h1></h1>
        <div className="our-games">
          {games.map((game) => (
            <Game
              key={game.id}
              name={game.name}
              price={game.price}
              description={game.description}
              genre={game.genre}
              rating={game.rating}
              release_date={game.release_date}
              publisher={game.publisher}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Store;
