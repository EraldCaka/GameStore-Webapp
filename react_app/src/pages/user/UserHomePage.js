import { apiCall } from "../../axios/axios";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate

const UserHomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  let token = {
    token: "",
    token_type: "user",
    name: "",
  };
  const verifyToken = async () => {
    const response = await apiCall("/login/token/user").fetchToken();
    const data = response.data;
    console.log(data);
    let token = {
      token: data.access_token,
      token_type: "user",
      name: data.token_type,
    };

    if (token.token !== "") {
      console.log("token verified");
    } else {
      console.log("token not verified");
      navigate("/register");
    }
  };
  verifyToken();

  return (
    <div>
      <h1>UserHomePage</h1>
    </div>
  );
};
export default UserHomePage;
