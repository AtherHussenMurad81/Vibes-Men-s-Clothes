"use client";

import { useMemo, useState } from "react";
import CartItem from "../CartItem/CartItem";
import Link from "next/link";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((acm, item) => acm + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ),
    [items]
  );

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, q) => {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: q } : item))
    );
  };

  return (
    <div>
      <p className="py-3">
        <span className="text-primary font-bold">{items.length}</span> Items
        Found in the cart
      </p>
      <hr />
      <div className="flex gap-6">
        {/* 🧾 Cart Summary (Left Side) */}
        <div className="flex-1">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-1"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="divider"></div>

              <div className="flex justify-between font-semibold">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-primary">
                <span>Total Price</span>
                <span>৳{totalPrice}</span>
              </div>

              {/* Confirm Button */}
              <div className="card-actions mt-4">
                <Link
                  href={"/checkOut"}
                  disabled={!items.length}
                  className="btn btn-primary w-full"
                >
                  Confirm Order
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🛒 Cart Items (Right / Main) */}
        <div className="flex-[3] space-y-4">
          {items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
