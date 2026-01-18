"use server";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";

const { dbConnect, collections } = require("@/lib/dbConnect");

const orderCollection = dbConnect(collections.ORDER);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) {
    return { success: false };
  }

  const cart = await getCart();
  //   console.log(result);

  if (cart.length == 0) {
    return { success: false };
  }

  const newOrder = {
    createdAt: new Date().toISOString(),
    items: cart,
    ...payload,
  };
  const result = await orderCollection.insertOne(newOrder);
  //   if(result.insertedId)

  //   create this cart

  if (Boolean(result.insertedId)) {
    const result = await clearCart();
  }
  return {
    success: result.insertedId,
  };
};
