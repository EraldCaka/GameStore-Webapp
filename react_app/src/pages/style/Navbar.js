import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { apiCall } from "../../axios/axios";
import { Navigate, useNavigate } from "react-router-dom";
function NavbarLine() {
  const navigate = useNavigate();
  let token = {
    token: "",
    token_type: "",
    name: "",
  };
  const verifyToken = async () => {
    const response = await apiCall("/login/token/user").fetchToken();
    const data = response.data;

    const role = localStorage.getItem("role");
    // console.log(data);
    token = {
      token: data.access_token,
      token_type: role,
      name: data.token_type,
    };

    if (token.token === "") {
      //console.log("token not verified");
      localStorage.setItem("token", "");
      navigate("/register");
    }
    if (token.token_type === "admin") {
      navigate("/admin");
    }
  };
  verifyToken();
  const Logout = async () => {
    const response = await apiCall("/login/logout").logout();
    const data = response.data;
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    // console.log(data + "logout");
    navigate("/register");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/homepage">GameStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/store">Store</Nav.Link>
            <Nav.Link href="/library">Library</Nav.Link>
            <NavDropdown title="Settings" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
              <NavDropdown.Item href="/cart">Cart</NavDropdown.Item>
              <NavDropdown.Item href="/user/transactions">
                Transactions
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLine;
