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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: calc(100% + 10px);
`;

const FormTextarea = styled.textarea`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: calc(100% + 10px);
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const imageResponse = await apiCall("/games/image").fetchByName(
          game.name
        );
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
    const body = {
      name: game.name,
      description: editValues.description,
      release_date: editValues.release_date,
      price: editValues.price,
      rating: editValues.rating,
      publisher: editValues.publisher,
      genre: editValues.genre,
    };

    const updateResponse = await apiCall("/games").put(body, game.game_id);

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

    if (gameInfo.image) {
      const base64Image = await getBase64(gameInfo.image);
      let image = base64Image.slice(23);
      const formData = new FormData();
      formData.append("name", game.name);
      formData.append("image", image);
      const imageData = {
        image: gameInfo.image,
      };
      const response = await axios.patch(
        "http://localhost:81/games/images/update/" + game.name,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    window.location.reload();
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
            <Label>Release Year:</Label>
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
            <Form>
              {isEditing ? (
                <>
                  <FormLabel>
                    <Label>Description</Label>
                    <FormTextarea
                      value={editValues.description}
                      onChange={(e) => handleInputChange(e, "description")}
                      rows="4"
                      maxLength={150}
                    />
                  </FormLabel>
                  <FormLabel>
                    <Label>Release Year</Label>
                    <FormInput
                      type="text"
                      value={editValues.release_date}
                      onChange={(e) => handleInputChange(e, "release_date")}
                    />
                  </FormLabel>
                  <FormLabel>
                    <Label>Price</Label>
                    <FormInput
                      type="text"
                      value={editValues.price}
                      onChange={(e) => handleInputChange(e, "price")}
                    />
                  </FormLabel>
                  <FormLabel>
                    <Label>Rating</Label>
                    <FormInput
                      type="text"
                      value={editValues.rating}
                      onChange={(e) => handleInputChange(e, "rating")}
                    />
                  </FormLabel>
                  <FormLabel>
                    <Label>Publisher</Label>
                    <FormInput
                      type="text"
                      value={editValues.publisher}
                      onChange={(e) => handleInputChange(e, "publisher")}
                    />
                  </FormLabel>
                  <FormLabel>
                    <Label>Genre</Label>
                    <FormInput
                      type="text"
                      value={editValues.genre}
                      onChange={(e) => handleInputChange(e, "genre")}
                    />
                  </FormLabel>
                </>
              ) : (
                <>
                  <p>
                    <Label>Price:</Label> {game.price}
                  </p>
                  <p>
                    <Label>Description:</Label> {game.description}
                  </p>
                  <p>
                    <Label>Release Year:</Label> {game.release_date}
                  </p>
                  <p>
                    <Label>Rating:</Label> {game.rating}
                  </p>
                  <p>
                    <Label>Publisher:</Label> {game.publisher}
                  </p>
                  <p>
                    <Label>Genre:</Label> {game.genre}
                  </p>
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
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default GameCard;
