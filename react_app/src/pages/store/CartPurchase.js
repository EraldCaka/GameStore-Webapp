import { apiCall } from "../../axios/axios";
import { useState } from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
const Container = styled.div`
  margin-top: 80px;
`;

const DivWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #ccc;
`;
const PriceText = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CashButton = styled.button`
  cursor: pointer;
  color: var(--white);
  background: var(--primary-500);
  border: transparent;
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  text-transform: capitalize;
  display: inline-block;
  &:hover {
    background-color: #f57c00;
  }
`;
const CartPurchase = () => {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const onSubmition = async () => {
    let tempName = localStorage.getItem("token");
    const getUserId = await apiCall("/users/search").fetchByName(tempName);
    const userId = getUserId.data[0].user_id;
    const response = await apiCall("/cart/user").fetchByName(userId);
    console.log(response.data[0]);
    for (let i = 0; i < response.data.length; i++) {
      const gameResponse1 = await apiCall("/games/search").fetchByName(
        response.data[i].game_name
      );
      console.log(gameResponse1.data[0]);
      const data = {
        user_id: response.data[0].user_id,
        game_name: gameResponse1.data[0].name,
      };

      console.log(data);
      const addToLibrary = await apiCall("/library").CreateLibrary(data);
      const getCart = await apiCall("/cart/user").fetchById(data.user_id);
      for (let i = 0; i < getCart.data.length; i++) {
        if (getCart.data[i].game_name === data.game_name) {
          const deleteFromCart = await apiCall("/cart").deleted(
            getCart.data[i].id
          );
          console.log(getCart.data);
          console.log(getCart.data[i].id);
          console.log("delete");
        }
      }
      console.log(getCart.data[0].id);

      //const deleteFromCart = await apiCall("/cart").deleted(getCart);
      //  console.log("delete" + deleteFromCart);
    }
    navigate("/library");
  };

  const fetchAllPrices = async () => {
    let tempName = localStorage.getItem("token");
    const getUserId = await apiCall("/users/search").fetchByName(tempName);
    const userId = getUserId.data[0].user_id;
    const response = await apiCall("/cart/user").fetchByName(userId);
    // console.log(response.data[0]);
    let totalPrice = 0;
    for (let i = 0; i < response.data.length; i++) {
      const gameResponse1 = await apiCall("/games/search").fetchByName(
        response.data[i].game_name
      );
      // console.log(gameResponse1);
      const price = gameResponse1.data[0].price;

      totalPrice += price;
    }
    setPrice(totalPrice);
    // console.log(price);
  };
  fetchAllPrices();
  return (
    <Container>
      <DivWrapper>
        <PriceText>{price} $</PriceText>
        <CashButton onClick={onSubmition}>Cash on Delivery</CashButton>
      </DivWrapper>
    </Container>
  );
};
export default CartPurchase;
