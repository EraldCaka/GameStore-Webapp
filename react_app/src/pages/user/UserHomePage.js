import { apiCall } from "../../axios/axios";
import { Navigate, useNavigate } from "react-router-dom";
import { NavbarLine } from "../style/";
const UserHomePage = () => {
  return (
    <div>
      <NavbarLine />
      <h1>UserHomePage</h1>
    </div>
  );
};
export default UserHomePage;
