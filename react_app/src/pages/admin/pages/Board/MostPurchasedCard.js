import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 16px;
  margin-left: 300px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const GameName = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;

  text-align: center;
`;

const MostPurchasedCard = ({ gameName }) => {
  return (
    <CardWrapper className="mostPurchasedCard">
      <CardImage src="https://via.placeholder.com/400x400" alt={gameName} />
      <GameName>{gameName}</GameName>
    </CardWrapper>
  );
};

export default MostPurchasedCard;
