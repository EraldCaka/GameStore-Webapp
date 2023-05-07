import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { DISPLAY_ALERT } from "../context/actions";
import { apiCall } from "../axios/axios";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../assets/images/defaultUserPfp/avatar1.png";
const initialState = {
  name: "",
  password: "",
  email: "",
  isMember: true,
};

const Register = () => {
  console.log(avatar);
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext();
  const navigate = useNavigate();
  const verifyToken = async (e) => {
    const response = await apiCall("/login/token/user").fetchToken();
    const data = response.data;
    console.log(data);

    if (data.access_token === "") {
      console.log("Not Logged in");
      return;
    } else {
      console.log("Already Logged in");
      navigate("/homepage");
    }
  };
  verifyToken();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let login = {};
    let register = {};

    console.log(values);
    if (values.isMember) {
      login = {
        name: values.name,
        password: values.password,
      };
      const response = await apiCall("/login").create(login);
      const data = response.data;

      // Redirect the user to UserHomePage.js
      console.log(data);
      if (data.token_type === values.name) {
        console.log("login success");
        localStorage.setItem("token", data.token_type);
        navigate("/homepage");
      } else {
        console.log("login failed");
        navigate("/register");
      }
    } else {
      register = {
        name: values.name,
        email: values.email,
        password: values.password,
        type: "user",
      };

      const response = await apiCall("/register").create(register);

      console.log(response.data);
      const imgUrl =
        "?image_url=https%3A%2F%2Fwww.asiamediajournal.com%2Fwp-content%2Fuploads%2F2022%2F11%2FDefault-PFP.jpg";

      const urlValid =
        "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg";
      const imageJson = {
        name: register.name,
        image_url: urlValid,
      };
      console.log(register.name);
      let temp = register.name;
      const responseImage = await apiCall("/users/images/save").createImage(
        temp,
        imgUrl,
        imageJson
      );
      console.log(responseImage.data);
    }

    login = {
      name: "",
      password: "",
    };
    register = {
      name: "",
      email: "",
      password: "",
    };
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    console.log(values);
  };

  return (
    <div>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          {/* name input*/}
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          {/* email inputt*/}
          {!values.isMember && (
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
          )}
          {/* password input*/}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {/* password input*/}
          <button type="submit" className="btn1 btn-block1" onClick={onSubmit}>
            submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </Wrapper>
    </div>
  );
};

export default Register;
