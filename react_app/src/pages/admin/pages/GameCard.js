import { useEffect, useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../../axios/axios";
const CardWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
`;

const UserName = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  flex: 0 0 10%;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Label = styled.p`
  font-weight: bold;
  margin-right: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  margin: 0 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &.btn1 {
  }

  &.btn2 {
    background-color: #ec7c71;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
`;

const GameCard = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameInfo, setGameInfo] = useState({
    imageUrl: "",
    image: null,
    imageDisplay: "",
  });
  //console.log(game);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const imageResponse = await apiCall("/games/image").fetchByName(
          game.name
        );
        //    console.log(imageResponse.data);

        const imagess = imageResponse.data.image;
        // console.log(imagess);
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

          setGameInfo({
            imageDisplay: temp ?? "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleRemoveClick = async () => {
    const response = await apiCall("/games").deleted(game.game_id);
    console.log("removed");
    window.location.reload();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardWrapper>
        <UserInfo>
          <UserName>{game.name}</UserName>
          <UserDetail>
            <Label>Release Day:</Label>
            <p>{game.release_date}</p>
          </UserDetail>
          <UserDetail>
            <Label>Price:</Label>
            <p>{game.price}</p>
          </UserDetail>
          <ButtonWrapper>
            <Button className="btn1" onClick={handleViewClick}>
              View
            </Button>
            <Button className="btn2" onClick={handleRemoveClick}>
              Remove
            </Button>
          </ButtonWrapper>
        </UserInfo>
      </CardWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <img
              src={
                gameInfo.imageDisplay ?? "https://via.placeholder.com/400x400"
              }
              alt="user"
              style={{ width: "400px", height: "400px" }}
            />
            <h3>Game Information</h3>
            <p>Name: {game.name}</p>
            <p>price: {game.price}</p>
            <p>Genre: {game.genre}</p>

            <Button className="btn1" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default GameCard;
