import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { DISPLAY_ALERT } from "../context/actions";
import { apiCall } from "../axios/axios";

const initialState = {
  name: "",
  password: "",
  email: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert } = useAppContext();
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

      console.log("login api test", data);
    } else {
      register = {
        name: values.name,
        email: values.email,
        password: values.password,
        type: "user",
      };
      const response = await apiCall("/register").create(register);
      const data = response.data;

      console.log("register api test", data);
    }

    login = {};
    register = {};
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
          <button type="submit" className="btn btn-block" onClick={onSubmit}>
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
