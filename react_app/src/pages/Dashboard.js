import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { apiCall } from "../axios/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const AdminAccount = async () => {
      console.log("Admin account does not exist");
      const data = {
        name: "admin",
        password: "admin",
        email: "admin@admin.com",
        type: "admin",
      };
      const response = await apiCall("/register").create(data);
      console.log(response);
      const imgUrl =
        "?image_url=https%3A%2F%2Fwww.asiamediajournal.com%2Fwp-content%2Fuploads%2F2022%2F11%2FDefault-PFP.jpg";

      const urlValid =
        "https://www.asiamediajournal.com/wp-content/uploads/2022/11/Default-PFP.jpg";
      const imageJson = {
        name: data.name,
        image_url: urlValid,
      };
      console.log(data.name);
      let temp = data.name;
      const responseImage = await apiCall("/users/images/save").createImage(
        temp,
        imgUrl,
        imageJson
      );
      console.log(responseImage.data);
    };
    AdminAccount();
    navigate("/landing");
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
