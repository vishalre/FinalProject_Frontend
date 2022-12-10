import { FindCart } from "../../../Services/CartService";

export const GetCartItems = async () => {
    const items = await FindCart();
    return items;
};


