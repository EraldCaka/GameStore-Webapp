import { NavbarLine } from "../style/";
import { useEffect, useState } from "react";

import LibraryCard from "../store/Cart";
import { apiCall } from "../../axios/axios";
import styled from "styled-components";

const Wrapper = styled.aside`
  .our-games {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CartCard = () => {
  const [games, setGames] = useState([]);
  console.log(localStorage.getItem("token"));
  let tempName = localStorage.getItem("token");
  const fetchGames = async () => {
    const getUserId = await apiCall("/users/search").fetchByName(tempName);

    //console.log(getUserId.data[0].user_id);
    const gameResponse = await apiCall("/cart/user").fetchByName(
      getUserId.data[0].user_id
    );

    const gamesWithImages = await Promise.all(
      gameResponse.data.map(async (game) => {
        const imageResponse = await apiCall("/games/image").fetchByName(
          game.game_name
        );
        const gameResponse1 = await apiCall("/games/search").fetchByName(
          game.game_name
        );
        const image = imageResponse.data.image;
        const price = gameResponse1.data[0].price;
        const description = gameResponse1.data[0].description;
        const genre = gameResponse1.data[0].genre;
        const rating = gameResponse1.data[0].rating;
        const release_date = gameResponse1.data[0].release_date;
        const publisher = gameResponse1.data[0].publisher;

        return {
          image: image,
          name: game.game_name,
          description: description,
          genre: genre,
          rating: rating,
          release_date: release_date,
          publisher: publisher,
        };
      })
    );

    setGames(gamesWithImages);
    //console.log(gameResponse);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  console.log("games:" + games);

  return (
    <div>
      <Wrapper>
        <NavbarLine />

        <div className="our-games">
          {games.map((game, index) => (
            <LibraryCard
              key={index}
              image={game.image}
              name={game.name}
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

export default CartCard;
