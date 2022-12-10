import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";

const CartItem = ({x}) => {
    return (
        <>
            <div className="item">
                <div className="buttons">
                    <span className="delete-btn"></span>
                    <span className="like-btn"></span>
                </div>

                <div className="image">
                    <img src="https://thumbs.dreamstime.com/b/basketball-isolated-28666494.jpg" alt=""/>
                </div>

                <div className="description">
                    <span>{x.name}</span>
                </div>

                <div className="quantity">
                    <button className="plus-btn" type="button" name="button">
                        +
                    </button>
                    <input type="text" name="name" value={x.quantity}></input>
                        <button className="minus-btn" type="button" name="button">
                            -
                        </button>

                </div>

                <div className="total-price">${x.unitPrice}</div>
            </div>
        </>
    );
};
export default CartItem;
