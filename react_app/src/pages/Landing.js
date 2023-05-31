import main from "../assets/images/landing_zelda.png";
import Wrapper from "../assets/wrappers/Testing";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav className="nav1">
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Game<span>Store</span>App
          </h1>
          <p>
            Welcome to our game store! We are your ultimate destination for all
            things gaming. Whether you're a casual player or a hardcore
            enthusiast, we have everything you need to satisfy your gaming
            needs. From the latest releases to classic titles, we have a wide
            range of games that will keep you entertained for hours on end. Our
            store also offers a variety of gaming accessories and hardware to
            enhance your gaming experience. With competitive prices and
            excellent customer service, our goal is to make your shopping
            experience as enjoyable as possible. Start browsing now and find
            your next favorite game!
          </p>

          <Link to="/register" className="btn1 btn-hero1">
            Login/Register
          </Link>
        </div>
        <div>
          <img src={main} alt="job hunt" className="img  main-img" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
