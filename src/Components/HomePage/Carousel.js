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
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cf6a8815533349.56292f17093a1.jpg"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
        <div>
          <img
            src="https://i0.wp.com/store.ave.com.bn/wp-content/uploads/2022/09/SEA_iPhone_14_Pro_Web_Banner_Pre-avail_1400x700_FFH-1.png?w=1400&ssl=1"
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
            src="https://pbs.twimg.com/profile_banners/90662986/1632838580/1080x360"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>

        <div>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/cf6a8815533349.56292f17093a1.jpg"
            style={{ width: "100%", height: "50vh" }}
            alt="Profile Banners"
          />
        </div>
        <div>
          <img
            src="https://i0.wp.com/store.ave.com.bn/wp-content/uploads/2022/09/SEA_iPhone_14_Pro_Web_Banner_Pre-avail_1400x700_FFH-1.png?w=1400&ssl=1"
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
