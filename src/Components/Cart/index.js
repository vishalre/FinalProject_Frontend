import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import {GetCartItems, AddToOrder} from "../Actions/Cart"

const CheckOut = (items) => {
    console.log(items);
    const loginInfo = JSON.parse(localStorage.getItem("LoggedIn"));
    items.forEach(function (item, index) {

        let array = {
            order: item._id,
            user: loginInfo._id,
            payment: "63938fdfeea0738f7b370b85",
            date: new Date().toString(),
        }
        AddToOrder(array);
    });
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
                    <Link to={`/order`}>
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
                            <div className="delete">
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    </>
                    )
                })}
                <button className="btn btn-primary cart-order-btn" onClick ={()=> CheckOut(items)}>Checkout</button>
            </div>
        </>
    );
};
export default CartItems;
