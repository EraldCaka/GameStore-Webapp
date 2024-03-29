import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 25rem;
  margin: 6rem;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  &:hover img {
    filter: blur(8px);
    -webkit-filter: blur(1.5px);
  }
  cursor: pointer;
`;

const GameCard = styled(Card)`
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
`;

const GameTitle = styled(Card.Title)`
  font-weight: bold;
  font-family: Bahnschrift;
  font-size: 2.1rem;
  margin-top: 2.5rem;
`;

const GameDescription = styled(Card.Text)`
  font-size: 1.1rem;
  color: #a0a0a0;
  font-family: Bahnschrift;
`;

const GameText = styled(Card.Text)`
  font-size: 0.8rem;
  color: #a0a0a0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  .btn1 {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
  }
  .btn1:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
  }
`;

const LibraryCard = ({
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
      <GameCard>
        <Wrapper1>
          {imageUrl ? (
            <Card.Img
              style={{ width: "100%", height: "150%" }}
              variant="top"
              src={imageUrl}
              alt={name}
              className="img-db"
              onLoad={handleImageLoad}
            />
          ) : (
            <span>Loading...</span>
          )}
        </Wrapper1>
        <Card.Body>
          <GameTitle>{name}</GameTitle>
          <GameDescription>{description}</GameDescription>

          <ButtonWrapper></ButtonWrapper>
        </Card.Body>
      </GameCard>
    </Wrapper>
  );
};

export default LibraryCard;
