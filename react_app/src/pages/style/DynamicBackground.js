import React, { useState, useEffect } from "react";

function getRandomImageUrl() {
  const imagePaths = [
    "/assets/images/RegisterImages/csgo.jpg",
    "/assets/images/RegisterImages/dyinglight.jpg",
    "/assets/images/RegisterImages/fifa2023.jpg",
    "/assets/images/RegisterImages/valorant.jpg",
    "/assets/images/RegisterImages/gta5.jpg",
    "/assets/images/RegisterImages/lastofus.jpg",
    "/assets/images/RegisterImages/portal2.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
}

function DynamicBackground() {
  const [imageUrl, setImageUrl] = useState(getRandomImageUrl());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageUrl(getRandomImageUrl());
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <div style={{ backgroundImage: `url(${imageUrl})` }} />;
}

export default DynamicBackground;
