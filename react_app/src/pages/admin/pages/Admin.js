import { NavbarLine } from "../index";
import styled from "styled-components";
import { MostPurchases } from "./Board";
const Admin = () => {
  return (
    <div>
      <NavbarLine />
      <h1>Admin</h1>
      <MostPurchases />
    </div>
  );
};
export default Admin;
