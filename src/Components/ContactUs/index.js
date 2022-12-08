import { useDispatch } from "react-redux";
import { CloseContactUs } from "../Actions/ContactUs";
import "./index.css";

const ContactUs = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="wd-privacy">
      <div className="wd-privacy-content">
        <div>
          <h5>Mail us at:</h5>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Saiteja Kura</span>&nbsp;
            <a href="mailto:kura.sa@northeastern.edu">
              (kura.sa@northeastern.edu)
            </a>
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Vineet Alampally</span>&nbsp;
            <a href="mailto:alampally.v@northeastern.edu">
              (alampally.v@northeastern.edu)
            </a>
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Vishal Reddy Gurrala</span>&nbsp;
            <a href="mailto:gurrala.v@northeastern.edu">
              (gurrala.v@northeastern.edu)
            </a>
          </p>
          <br></br>

          <h5>Contact us at:</h5>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Saiteja Kura</span>&nbsp;
            <a href="tel:+18574925747">(+18576938501)</a>
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Vineet Alampally</span>&nbsp;
            <a href="tel:+18572654080">(+18576938500)</a>
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;<span>Vishal Reddy Gurrala</span>&nbsp;
            <a href="tel:+19714176064">(+13398371595)</a>
          </p>
        </div>
        <i
          className="fa fa-times position-absolute top-0 end-0 p-3"
          aria-hidden="true"
          onClick={() => CloseContactUs(dispatch)}
        ></i>
      </div>
    </div>
  );
};

export default ContactUs;
