import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/home/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItems = await getCart();

  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div>
      {/* title */}

      <div className="">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-primary">
          Checkout page
        </h2>
      </div>

      <CheckOut cartItems={formattedItems}></CheckOut>
    </div>
  );
};

export default CheckOutPage;
