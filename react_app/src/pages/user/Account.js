import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavbarLine } from "../style/";
import { apiCall } from "../../axios/axios";
import axios from "axios";

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    image: null,
    imageDisplay: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiCall("/users/search/entity").fetchByName(
          localStorage.getItem("token")
        );
        const imageResponse = await apiCall("/users/images").fetchByName(
          response.data.name
        );
        setUserInfo({
          id: response.data.user_id,
          username: response.data.name,
          email: response.data.email,
          password: response.data.password,
        });

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
            id: response.data.user_id,
            username: response.data.name,
            email: response.data.email,
            password: response.data.password,
            imageDisplay: temp ?? "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const update = {
        name: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
      };
      const id = userInfo.id;
      const response = await apiCall("/users").put(update, id);
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
      const handleImageUpload = async () => {
        const base64Image = await getBase64(userInfo.image);
        let imageBinary = base64Image.slice(23);
        const formData = new FormData();
        formData.append("name", userInfo.username);
        formData.append("image", imageBinary);
        const data = {
          image: userInfo.image,
        };

        //  console.log(data);
        const response = await axios.patch(
          "http://localhost:81/users/images/update/" + userInfo.username,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
      };

      handleImageUpload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleImageChange = (event) => {
    let file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserInfo({
        ...userInfo,
        imageUrl: imageUrl,
        image: file,
      });

      console.log(file);
    }
  };
  const handleImageLoad = () => {
    URL.revokeObjectURL(userInfo.imageUrl);
    URL.revokeObjectURL(userInfo.imageDisplay);
  };
  return (
    <div>
      <NavbarLine />
      <Container>
        <ProfilePic href="#">
          <label htmlFor="profile-pic-input">
            {userInfo.imageUrl || userInfo.imageDisplay ? (
              <img
                src={
                  userInfo.imageUrl ??
                  userInfo.imageDisplay ??
                  "https://via.placeholder.com/400x400"
                }
                alt="profile picture"
                onLoad={handleImageLoad}
              />
            ) : (
              <span></span>
            )}
          </label>
          <input
            id="profile-pic-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </ProfilePic>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />

          <button type="submit" className="btn1 btn-hero1">
            Save Changes
          </button>
        </form>
      </Container>
    </div>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    width: 400px;

    label {
      margin-top: 10px;
      font-weight: bold;
    }

    input {
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      border: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    button {
      margin-top: 20px;
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
    }
  }
`;

const ProfilePic = styled.a`
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 30px;
  cursor: pointer;

  img,
  label {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    cursor: pointer;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
  }

  &:hover img,
  &:hover label {
    transform: scale(1.1);
  }
`;

export default Account;
