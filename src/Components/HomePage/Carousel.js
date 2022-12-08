import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { useSelector } from "react-redux";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} style={{backgroundColor:"#222f3e"}} onClick={onClick}>
      <i className="fa-solid fa-angle-left" style={{ color: "#ff9900" }}></i>
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} style={{backgroundColor:"#222f3e"}} onClick={onClick}>
      <i className="fa-solid fa-angle-right" style={{ color: "#ff9900" }}></i>
    </div>
  );
};
const Carousel = () => {
  const login = useSelector((state) => state.LogIn);
  return (
    <>
    {login.logedIn ? (
      <Slider
        autoplay={true}
        autoplaySpeed={3000}
        dots={true}
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
      >
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/90662986/1632838580/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>

        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/377228272/1649921262/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/20536157/1651091993/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/15087766/1621257879/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        
        </div>
      </Slider>

    ) :(
      <Slider
        autoplay={true}
        autoplaySpeed={3000}
        dots={true}
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
      >
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/3138727082/1650261295/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>

        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/74580436/1641328646/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
        <div>
          <img
            src="https://pbs.twimg.com/profile_banners/297169759/1647525684/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
      </Slider>
    )}
    </>
  );
};
export default Carousel;
