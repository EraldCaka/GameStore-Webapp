import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { NavbarLine } from "../style/";
import { apiCall } from "../../axios/axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const GameInfo = () => {
  const { gameId } = useParams();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    genre: "",
    release_date: "",
    publisher: "",
    imageDisplay: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiCall("/games/search").fetchByName(gameId);
        const imageResponse = await apiCall("/games/image").fetchByName(gameId);

        const imagess = imageResponse.data.image;
        if (imagess) {
          const imageData = atob(decodeURIComponent(imagess));
          const byteNumbers = new Array(imageData.length);
          for (let i = 0; i < imageData.length; i++) {
            byteNumbers[i] = imageData.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/png" });
          const urlCreator = window.URL || window.webkitURL;
          const temp = urlCreator.createObjectURL(blob);

          setUserInfo({
            id: response.data["0"].game_id,
            name: response.data["0"].name,
            price: response.data["0"].price,
            description: response.data["0"].description,
            genre: response.data["0"].genre,
            release_date: response.data["0"].release_date,
            publisher: response.data["0"].publisher,
            imageDisplay: temp ?? "",
          });
        }
      } catch (error) {
        console.error(error);
        navigate("/store");
      }
    };
    fetchUserInfo();
  }, []);
  const handleImageLoad = () => {
    URL.revokeObjectURL(userInfo.imageDisplay);
  };
  return (
    <div className="game-info">
      <NavbarLine />
      <ImageWrapper>
        {userInfo.imageDisplay ? (
          <GameImage
            src={userInfo.imageDisplay}
            alt="Game Background"
            onLoad={handleImageLoad}
          />
        ) : (
          <span></span>
        )}
      </ImageWrapper>
      <Body>
        <GameInfoContainer>
          <GameTitle>{userInfo.name}</GameTitle>
          <GameDescription>
            Description : {userInfo.description}
          </GameDescription>
          <GamePrice>Price : {userInfo.price}$</GamePrice>
          <GamePrice>Genre : {userInfo.genre}</GamePrice>
          <GamePrice>Release Date : {userInfo.release_date}</GamePrice>
          <GamePrice>Publisher : {userInfo.publisher}</GamePrice>
        </GameInfoContainer>
      </Body>
      <GameButtonsContainer className="game-info__buttons">
        <GameButton className="btn1 btn-hero1">Add to Cart</GameButton>
        <GameButton className="btn1 btn-hero1">Add to Wishlist</GameButton>
      </GameButtonsContainer>
    </div>
  );
};
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 99vw;
  height: auto;
`;

const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-image: url("");
  background-size: cover;
  background-position: center;
  padding: 2rem;
`;

const GameTitle = styled.h1`
  font-size: 3rem;
  color: #000;
`;

const GameDescription = styled.p`
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 2rem;
`;

const GamePrice = styled.p`
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 2rem;
`;

const GameButtonsContainer = styled.div`
  justify-content: space-between;
  align-items: center;
  //center the buttons
  display: flex;
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`;

const GameButton = styled.button`
  margin-top: 1.5rem;
  padding: 1.5rem 2.5rem;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  //center the image

  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

export default GameInfo;
