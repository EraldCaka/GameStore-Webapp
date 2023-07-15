import { apiCall } from "../../../../axios/axios";
import { useEffect, useState } from "react";

const MostPurchases = () => {
  const [mostPurchases, setMostPurchases] = useState([]);
  const [mostBought, setMostBought] = useState([]);

  useEffect(() => {
    const getMostPurchases = async () => {
      try {
        const response = await apiCall("/transactions").fetchAll();
        setMostPurchases(response.data);
        getMostBought(response.data);
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

  return (
    <div className="mostPurchases">
      <h2>Most Purchased Games</h2>

      <ul>
        {mostBought.map((game) => (
          <li key={game}>{game}</li>
        ))}
      </ul>
    </div>
  );
};

export default MostPurchases;
