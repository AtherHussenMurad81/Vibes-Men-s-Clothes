"use client";

import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();

  const router = useRouter();
  // ================= Calculations =================
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      contactNo: form.contactNo.value,
      address: form.deliveryInfo.value,
      instruction: form.specialInstruction.value,
      orderInfo: form.orderInfo.value,
    };

    const result = await createOrder(payload);

    if (result.success) {
      Swal.fire("success", "Order added", "Success");
      router.push("/");
    } else {
      Swal.fire("error", "Something went wrong", "error");
      router.push("/cart");
    }
  };

  if (session.status == "loading") {
    return <h2 className="text-center text-10xl">Loading.........</h2>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ================= Left Side : Form ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Delivery Details</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email (Same Row) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className="input input-bordered w-full"
                  value={session?.data?.user?.name}
                  required
                  readOnly
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                  value={session?.data?.user?.email}
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Contact Number</span>
              </label>
              <input
                type="text"
                name="contactNo"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
                // value={form.contactNo}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Delivery Address</span>
              </label>
              <textarea
                name="deliveryInfo"
                placeholder="House, Road, Area, City"
                className="textarea textarea-bordered w-full min-h-[90px]"
                // value={form.deliveryInfo}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Special Instruction */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Special Instruction
                </span>
              </label>
              <textarea
                name="specialInstruction"
                placeholder="Call before delivery, leave at gate, etc."
                className="textarea textarea-bordered w-full min-h-[80px]"
                // value={form.specialInstruction}
                // onChange={handleChange}
              />
            </div>

            {/* Order Info (Optional) */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Order Info (Optional)
                </span>
              </label>
              <textarea
                name="orderInfo"
                placeholder="Any extra information"
                className="textarea textarea-bordered w-full min-h-[70px]"
                // value={form.orderInfo}
                // onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg">
              Check Out with cash on delivery
            </button>
          </form>
        </div>

        {/* ================= Right Side : Summary ================= */}
        <div className="bg-gray-50 shadow-lg rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-6">Order Summary</h3>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 items-center border-b pb-4 mb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">Price: ৳{item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">৳{item.price * item.quantity}</p>
            </div>
          ))}

          <div className="flex justify-between text-lg font-bold mt-6">
            <span>Total ({totalItems} items)</span>
            <span>৳{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
