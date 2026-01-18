import { getCart } from "@/actions/server/cart";
import CartItem from "@/components/CartItem/CartItem";
import Cart from "@/components/home/Cart";
import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  //   console.log(cartItems[0]);
  //   const formattedItems = cartItems.map(item=>{...item, _id:item._id.toString()})

  const formatterItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div>
      <h2 className="text-4xl py-4 font-bold border-l-8 border-primary pl-8">
        My Cart
      </h2>
      <Cart cartItem={formatterItems} />
    </div>
  );
};

export default CartPage;
