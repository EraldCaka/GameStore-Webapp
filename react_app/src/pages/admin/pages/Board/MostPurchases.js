import { apiCall } from "../../../../axios/axios";
import { useEffect, useState } from "react";
import MostPurchasedCard from "./MostPurchasedCard";
import styled from "styled-components";
import PurchasedGraphEl from "../PurchasedGraphEl";

const MostPurchases = () => {
  const [mostPurchases, setMostPurchases] = useState([]);
  const [mostBought, setMostBought] = useState([]);
  const [gamesPurchaseAmount, setGamesPurchaseAmount] = useState({});

  useEffect(() => {
    const getMostPurchases = async () => {
      try {
        const response = await apiCall("/transactions").fetchAll();
        setMostPurchases(response.data);
        getMostBought(response.data);
        calculateGamesPurchaseAmount(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMostPurchases();
  }, []);

  const getMostBought = (data) => {
    const countMap = {};

    data.forEach((item) => {
      const gameName = item.game_name;
      if (countMap[gameName]) {
        countMap[gameName]++;
      } else {
        countMap[gameName] = 1;
      }
    });

    const sortedGames = Object.keys(countMap).sort(
      (a, b) => countMap[b] - countMap[a]
    );

    const top3Games = sortedGames.slice(0, 3);

    setMostBought(top3Games);
  };

  const calculateGamesPurchaseAmount = (data) => {
    const countMap = {};

    data.forEach((item) => {
      const gameName = item.game_name;
      if (countMap[gameName]) {
        countMap[gameName]++;
      } else {
        countMap[gameName] = 1;
      }
    });

    const purchaseAmounts = Object.values(countMap);
    setGamesPurchaseAmount(purchaseAmounts);
  };

  return (
    <div className="mostPurchases">
      <MostPurchasedGamesTitle
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "20px",
          fontFamily: "sans-serif",
        }}
      >
        Most Purchased Games
      </MostPurchasedGamesTitle>
      <CardContainer>
        {mostBought.map((game) => (
          <MostPurchasedCard key={game} gameName={game} />
        ))}
      </CardContainer>
      <PurchasedGraphEl purchased={gamesPurchaseAmount} games={mostBought} />
    </div>
  );
};

const MostPurchasedGamesTitle = styled.h2`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;

  > * {
    margin-right: 30px;
  }
`;

export default MostPurchases;
