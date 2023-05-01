import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import testImage from "./test.jpg";
function Game({
  name,
  price,
  description,
  genre,
  rating,
  release_date,
  publisher,
}) {
  return (
    <Card
      style={{
        width: "18rem",
        margin: "1rem",
      }}
    >
      <Card.Body>
        <Card.Img variant="top" src={testImage} />
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description} </Card.Text>
        <Card.Text>{genre} </Card.Text>
        <Card.Text>{rating} </Card.Text>
        <Card.Text>{release_date} </Card.Text>
        <Card.Text>{publisher} </Card.Text>
        <Card.Text>{price} </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Game;

//
