import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavbarLine } from "../style/";
import { apiCall } from "../../axios/axios";

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  let update = {};
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiCall("/users/search").fetchByName(
          localStorage.getItem("token")
        );

        setUserInfo({
          id: response.data[0].user_id,
          username: response.data[0].name,
          email: response.data[0].email,
          password: response.data[0].password,
        });
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
      update = {
        name: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
      };
      console.log(userInfo.id);
      console.log(update.name);
      console.log(update.email);
      console.log(update.password);
      const id = userInfo.id;
      const response = await apiCall("/users").put(update, id);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarLine />
      <Container>
        <ProfilePic href="#">
          <img
            src="https://via.placeholder.com/400x400"
            alt="profile picture"
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
  justify-content: center; /* center horizontally */
  align-items: center; /* center vertically */

  form {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    width: 400px; /* increase width */

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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`;

export default Account;
