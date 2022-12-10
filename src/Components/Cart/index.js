import { useEffect, useState } from "react";
import "./index.css";

import CartItem from "./CartItem";
import {GetCartItems} from "../Actions/Cart"

// const items =[
//     {
//         "name" :"chair",
//         "quantity" : 5,
//         "payment" : "",
//         "price" : 100
//     },
//
//     {
//         "name" :"Sofa",
//         "quantity" : 3,
//         "payment" : "",
//         "price" : 500
//     },
//
// ]

const CartItems = () => {
    const [items, setCart] = useState([]);
    useEffect(() => {
        GetCartItems().then((data) => setCart(data));
     }, [items]);
    return (
        <>
            <div className="row my-4">
                <h3>Your shopping cart</h3>
                {items?.map((x) => {
                    return <CartItem x={x} />;
                })}
            </div>
        </>
    );
};
export default CartItems;
