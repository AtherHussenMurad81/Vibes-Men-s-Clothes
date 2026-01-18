"use server";

import { authOptions } from "@/lib/authOption";
import { ObjectId } from "mongodb";
// import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

// its a very expensive function for inc and dec. Dont use this
export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  //getCartItem->user.email && productId
  const query = { email: user?.email, productId: product?._id };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    //if Exist:Update Cart

    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    //Not Exist:insert Cart
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};
export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  const query = { email: user?.email };

  const result = await cartCollection.find(query).toArray();
  return result;
});

export const deleteItemFromCart = async (id) => {
  const { user } = await getServerSession(authOptions);
  if (!user) return { success: false };

  if (id?.length != 24) {
    return { success: false };
  }
  const query = { _id: new ObjectId(id) };

  const result = await cartCollection.deleteOne(query);
  //   if (Boolean(result.deletedCount)) {
  //     revalidatePath("/cart");
  //   }
  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDv = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  //   console.log("increase id ", id);
  if (quantity >= 10) {
    return {
      success: false,
      message: "You cannot but 10 products at a time",
    };
  }
  const query = { _id: new ObjectId(id) };

  const updatedData = {
    $inc: {
      quantity: 1,
    },
  };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};
export const decreaseItemsDb = async (id, quantity) => {
  console.log(id._id, "id fount");
  // console.log("quantity", quantity);
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity <= 1) {
    return {
      success: false,
      message: "Quantity cannot be empty",
    };
  }

  const query = { _id: new ObjectId(id._id) };

  const updatedData = {
    $inc: {
      quantity: -1,
    },
  };
  const result = await cartCollection.updateOne(query, updatedData);
  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) {
    return {
      success: false,
    };
  }
  const query = { email: user?.email };
  const result = await cartCollection.deleteMany(query);
  return result;
};
