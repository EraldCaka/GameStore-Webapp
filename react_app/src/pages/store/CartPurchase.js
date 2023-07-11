import { apiCall } from "../../axios/axios";
import { useState } from "react";
import styled from "styled-components";
const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: #f5f5f5;
`;
const CartPurchase = () => {
  const [price, setPrice] = useState(0);
  const fetchAllPrices = async () => {
    let tempName = localStorage.getItem("token");
    const getUserId = await apiCall("/users/search").fetchByName(tempName);
    const userId = getUserId.data[0].user_id;
    const response = await apiCall("/cart/user").fetchByName(userId);
    console.log(response.data[0]);
    let totalPrice = 0;
    for (let i = 0; i < response.data.length; i++) {
      const gameResponse1 = await apiCall("/games/search").fetchByName(
        response.data[i].game_name
      );
      console.log(gameResponse1);
      const price = gameResponse1.data[0].price;

      totalPrice += price;
    }
    setPrice(totalPrice);
    console.log(price);
  };
  fetchAllPrices();
  return (
    <DivWrapper>
      <div>{price} $</div>
      <button>Cash on Delivery</button>
    </DivWrapper>
  );
};
export default CartPurchase;
