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
    const gameResponse = await apiCall("/games").fetchAll();
    const gamesWithImages = await Promise.all(
      gameResponse.data.map(async (game) => {
        const imageResponse = await apiCall("/games/image").fetchByName(
          game.name
        );
        const image = imageResponse.data.image;
        // console.log(image);
        return {
          ...game,
          image: image,
        };
      })
    );

    setGames(gamesWithImages);
    //console.log(gameResponse);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <Wrapper>
        <NavbarLine />

        <div className="our-games">
          {games.map((game, index) => (
            <Game
              key={index}
              image={game.image}
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
