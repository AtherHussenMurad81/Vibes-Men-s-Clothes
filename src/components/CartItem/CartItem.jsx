"use client";

import {
  decreaseItemsDb,
  deleteItemFromCart,
  increaseItemDv,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
//   connat take on remove on this params
const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { image, title, quantity, price, _id } = item;

  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemFromCart(_id);
        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
      setLoading(false);
    });
  };
  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDv(_id, quantity);
    if (result.success) {
      Swal.fire("success", "quantity Increased", "success");
      updateQuantity(_id, quantity + 1);
    }
    setLoading(false);
  };
  const onDecrease = async () => {
    setLoading(true);
    const result = await decreaseItemsDb({ _id, quantity });
    // console.log(result);
    if (result.success) {
      Swal.fire("quality", "decrease", "success");
      updateQuantity(_id, quantity - 1);
    }
    setLoading(false);
  };
  return (
    <div className="card card-side bg-base-100 shadow-md p-4 gap-4">
      {/* Image */}
      <figure className="w-24 h-24 relative">
        <Image src={image} alt={title} fill className="object-cover rounded" />
      </figure>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-sm text-gray-500">Price: ৳{price}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={onDecrease}
              disabled={quantity <= 1 || loading}
              className="btn btn-sm btn-outline"
            >
              <FaMinus />
            </button>

            <span className="px-3 font-semibold">{quantity}</span>

            <button
              disabled={quantity === 10 || loading}
              onClick={onIncrease}
              className="btn btn-sm btn-outline"
            >
              <FaPlus />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error btn-outline flex items-center gap-1"
          >
            <FaTrash />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
