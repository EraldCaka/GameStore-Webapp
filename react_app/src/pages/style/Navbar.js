import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { apiCall } from "../../axios/axios";

function NavbarLine() {
  const Logout = async () => {
    const response = await apiCall("/login/logout").logout();
    const data = response.data;
    console.log(data);
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
            <Nav.Link href="/homepage">Home</Nav.Link>
            <Nav.Link href="/store">Store</Nav.Link>
            <Nav.Link href="/library">Library</Nav.Link>
            <NavDropdown title="Settings" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/register" onClick={Logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Add Funds
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLine;
