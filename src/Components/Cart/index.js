import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import {GetCartItems} from "../Actions/Cart"

const CheckOut = () => {
    console.log("Called Checkout");
}

const CartItems = () => {
    const [items, setCart] = useState([]);
    useEffect(() => {
        GetCartItems().then((data) => setCart(data));
     }, []);

    return (
        <>
            <div className="row my-4">
                <div>
                <h3>Your shopping cart</h3>
                    <Link to={`/details/`}>
                        <button className="btn btn-primary cart-order-btn">Orders</button>
                    </Link>
                </div>
                {items?.map((x) => {
                    return(
                    <>
                        <div className="item">

                            <div className="image">
                                <img className="wd-image" src={x.productimg} alt=""/>
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
                    )
                })}
                <button className="btn btn-primary cart-order-btn" onClick ={()=> CheckOut()}>Checkout</button>
            </div>
        </>
    );
};
export default CartItems;
