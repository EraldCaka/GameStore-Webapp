import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { apiCall } from "../../../../axios/axios";
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
  const [gameInfo, setGameInfo] = useState({
    image: null,
    imageDisplay: "",
  });
  useEffect(() => {
    const fetchGameImage = async () => {
      try {
        const imageResponse = await apiCall("/games/image").fetchByName(
          gameName
        );
        // console.log(imageResponse);
        if (imageResponse.data.image) {
          const imageData = atob(decodeURIComponent(imageResponse.data.image));
          const byteNumbers = new Array(imageData.length);
          for (let i = 0; i < imageData.length; i++) {
            byteNumbers[i] = imageData.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/png" });
          const urlCreator = window.URL || window.webkitURL;
          const temp = urlCreator.createObjectURL(blob);

          setGameInfo({
            imageDisplay: temp ?? "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameImage();
  }, []);
  return (
    <CardWrapper className="mostPurchasedCard">
      <CardImage
        src={gameInfo.imageDisplay || "https://via.placeholder.com/400x400"}
        alt={gameName}
        style={{
          width: "166px",
          height: "200px",
        }}
      />
      <GameName>{gameName}</GameName>
    </CardWrapper>
  );
};

export default MostPurchasedCard;
