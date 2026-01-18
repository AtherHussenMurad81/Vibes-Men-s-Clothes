"use client";

import Image from "next/image";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import Link from "next/link";
import CartButton from "../Buttons/CartButton";

const ProductCard = ({ product }) => {
  const [loaded, setLoaded] = useState(false);

  const { title, image, price, discount, ratings, reviews, sold, _id } =
    product;
  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300); // small delay
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    // Skeleton Loader
    return <ProductSkeleton />;
  }

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition duration-300">
      {/* Image */}
      <figure className="p-4">
        <Image
          src={image}
          alt={title}
          width={180}
          height={300}
          className="rounded-xl object-contain h-48 w-full"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body pt-0">
        <h2 className="card-title text-base line-clamp-2">{title}</h2>

        <div className="flex items-center gap-2 text-sm mt-1">
          <FaStar className="text-warning" />
          <span>{ratings}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        <p className="text-sm text-gray-500 mt-1">Sold: {sold}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {discount && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        <CartButton product={{ ...product, _id: _id.toString() }} />
        <Link
          href={`/products/${_id}`}
          className="btn btn-primary btn-outline mt-4 w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
