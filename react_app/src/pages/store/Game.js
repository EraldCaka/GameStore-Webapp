import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 18rem;
  margin: 1rem;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Game = ({
  image,
  name,
  price,
  description,
  genre,
  rating,
  release_date,
  publisher,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (image) {
      const imageData = atob(decodeURIComponent(image));
      const byteNumbers = new Array(imageData.length);
      for (let i = 0; i < imageData.length; i++) {
        byteNumbers[i] = imageData.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });
      const urlCreator = window.URL || window.webkitURL;
      setImageUrl(urlCreator.createObjectURL(blob));
    }
  }, [image]);

  const handleImageLoad = () => {
    URL.revokeObjectURL(imageUrl);
  };

  return (
    <Wrapper>
      <Card>
        <Wrapper1>
          {imageUrl ? (
            <Card.Img
              variant="top"
              src={imageUrl}
              alt={name}
              onLoad={handleImageLoad}
            />
          ) : (
            <span>Loading...</span>
          )}
        </Wrapper1>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>{genre}</Card.Text>
          <Card.Text>{rating}</Card.Text>
          <Card.Text>{release_date}</Card.Text>
          <Card.Text>{publisher}</Card.Text>
          <Card.Text>{price}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

export default Game;
