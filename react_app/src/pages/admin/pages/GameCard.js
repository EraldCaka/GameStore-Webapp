import { useEffect, useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../../axios/axios";
import axios from "axios";
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
  &.btn3 {
    background-color: #fdfd96;
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
  max-height: 80vh;
  overflow-y: auto;
`;
const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const GameCard = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameInfo, setGameInfo] = useState({
    image: null,
    imageDisplay: "",
  });
  const [editValues, setEditValues] = useState({
    description: game.description,
    release_date: game.release_date,
    price: game.price,
    rating: game.rating,
    publisher: game.publisher,
    genre: game.genre,
  });
  const [isEditing, setIsEditing] = useState(false);
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

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    setIsEditing(false);
    console.log(game.game_id);
    const body = {
      name: game.name,
      description: editValues.description,
      release_date: editValues.release_date,
      price: editValues.price,
      rating: editValues.rating,
      publisher: editValues.publisher,
      genre: editValues.genre,
    };

    //  console.log(body);
    const updateResponse = await apiCall("/games").put(body, game.game_id);

    // console.log(updateResponse);

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };
    console.log(gameInfo.image);
    const base64Image = await getBase64(gameInfo.image);
    let image = base64Image.slice(23);
    // console.log(image);
    const formData = new FormData();
    formData.append("name", game.name);
    formData.append("image", image);
    const data = {
      image: gameInfo.image,
    };
    console.log(data);
    console.log(game.name);
    const response = await axios.patch(
      "http://localhost:81/games/images/update/" + game.name,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    // window.location.reload();
  };
  const handleEditClick = () => {
    setIsEditing(true);
    handleViewClick();
  };

  const handleInputChange = (e, field) => {
    setEditValues({
      ...editValues,
      [field]: e.target.value,
    });
  };
  const handleImageClick = () => {
    if (!isEditing) return;

    const fileInput = document.getElementById("image-input");
    fileInput && fileInput.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      setGameInfo({
        image: file,
        imageDisplay: event.target.result,
      });
    };
    reader.readAsDataURL(file);
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
            <Button className="btn1" onClick={handleEditClick}>
              Edit
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
                gameInfo.imageDisplay || "https://via.placeholder.com/400x400"
              }
              alt="game"
              style={{
                width: "400px",
                height: "400px",
                cursor: isEditing ? "pointer" : "default",
              }}
              onClick={handleImageClick}
            />
            <h3>{game.name}</h3>
            {isEditing ? (
              <>
                <FormLabel>
                  Description:
                  <FormTextarea
                    value={editValues.description}
                    onChange={(e) => handleInputChange(e, "description")}
                    rows="4"
                    maxLength={150}
                  />
                </FormLabel>
                <FormLabel>
                  Release Date:
                  <FormInput
                    type="text"
                    value={editValues.release_date}
                    onChange={(e) => handleInputChange(e, "release_date")}
                  />
                </FormLabel>
                <FormLabel>
                  Price:
                  <FormInput
                    type="text"
                    value={editValues.price}
                    onChange={(e) => handleInputChange(e, "price")}
                  />
                </FormLabel>
                <FormLabel>
                  Rating:
                  <FormInput
                    type="text"
                    value={editValues.rating}
                    onChange={(e) => handleInputChange(e, "rating")}
                  />
                </FormLabel>
                <FormLabel>
                  Publisher:
                  <FormInput
                    type="text"
                    value={editValues.publisher}
                    onChange={(e) => handleInputChange(e, "publisher")}
                  />
                </FormLabel>
                <FormLabel>
                  Genre:
                  <FormInput
                    type="text"
                    value={editValues.genre}
                    onChange={(e) => handleInputChange(e, "genre")}
                  />
                </FormLabel>
              </>
            ) : (
              <>
                <p>Price: {game.price}</p>
                <p>Description: {game.description}</p>
                <p>Release Date: {game.release_date}</p>
                <p>Rating: {game.rating}</p>
                <p>Publisher: {game.publisher}</p>
                <p>Genre: {game.genre}</p>
              </>
            )}
            <input
              id="image-input"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
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
