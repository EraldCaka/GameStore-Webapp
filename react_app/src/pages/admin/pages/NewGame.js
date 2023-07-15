import { useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../../axios/axios";
import { NavbarLine } from "../index";
import axios from "axios";
const NewGameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  margin-top: -70px;
  flex: 1;
  max-width: 400px;
`;

const ImageWrapper = styled.div`
  flex: 0 0 300px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const CircularImage = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  margin-top: -70px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 12px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const FormTextarea = styled.textarea`
  padding: 12px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  color: #fff;
  font-size: 18px;
  margin-top: 16px;

  border-radius: 4px;
  cursor: pointer;
`;
const NewGame = () => {
  const [gameData, setGameData] = useState({
    name: "",
    price: "",
    description: "",
    genre: "",
    rating: "",
    release_date: "",
    publisher: "",
    image: null,
    imageStore: null,
  });

  const handleInputChange = (e, field) => {
    setGameData({
      ...gameData,
      [field]: e.target.value,
    });
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("image-input");
    fileInput && fileInput.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      // console.log(event.target.result);
      setGameData({
        ...gameData,
        image: event.target.result,
        imageStore: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: gameData.name,
        price: gameData.price,
        description: gameData.description,
        genre: gameData.genre,
        rating: gameData.rating,
        release_date: gameData.release_date,
        publisher: gameData.publisher,
      };
      console.log(data);
      console.log(gameData.imageStore);
      const imageData = {
        image: gameData.imageStore,
      };
      console.log(imageData);

      if (gameData.image) {
        const response = await apiCall("/games").create(data);
        console.log("game created:", response.data);
      }
      const imageResponse = await axios.post(
        "http://localhost:81/games/images/" + data.name,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("img created:", imageResponse.data);

      setGameData({
        name: "",
        price: "",
        description: "",
        genre: "",
        rating: "",
        release_date: "",
        publisher: "",
        image: null,
        imageStore: null,
      });
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div>
      <NavbarLine />

      <NewGameWrapper>
        <ImageWrapper onClick={handleImageClick}>
          <CircularImage
            src={gameData.image || "https://via.placeholder.com/400x400"}
            alt="Game Image"
          />
        </ImageWrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              placeholder="Name"
              value={gameData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <FormInput
              type="number"
              placeholder="Price"
              value={gameData.price}
              onChange={(e) => handleInputChange(e, "price")}
            />
            <FormTextarea
              placeholder="Description"
              value={gameData.description}
              onChange={(e) => handleInputChange(e, "description")}
              rows="4"
              maxLength={150}
            />
            <FormInput
              type="text"
              placeholder="Genre"
              value={gameData.genre}
              onChange={(e) => handleInputChange(e, "genre")}
            />
            <FormInput
              type="number"
              placeholder="Rating"
              value={gameData.rating}
              onChange={(e) => handleInputChange(e, "rating")}
            />
            <FormInput
              type="text"
              placeholder="Release Date"
              value={gameData.release_date}
              onChange={(e) => handleInputChange(e, "release_date")}
            />
            <FormInput
              type="text"
              placeholder="Publisher"
              value={gameData.publisher}
              onChange={(e) => handleInputChange(e, "publisher")}
            />
            <input
              id="image-input"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button type="submit" className="btn1">
              Create Game
            </Button>
          </Form>
        </FormWrapper>
      </NewGameWrapper>
    </div>
  );
};

export default NewGame;
