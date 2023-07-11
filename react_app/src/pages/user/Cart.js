import { NavbarLine } from "../style/";
import { useEffect, useState } from "react";
import CartPurchase from "../store/CartPurchase";
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
        console.log(gameResponse1);
        const image = imageResponse.data.image;
        const price = gameResponse1.data[0].price;

        console.log(price);

        return {
          image: image,
          name: game.game_name,
          price: price,
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
              price={game.price}
            />
          ))}
        </div>
      </Wrapper>
      <CartPurchase />
    </div>
  );
};

export default CartCard;
