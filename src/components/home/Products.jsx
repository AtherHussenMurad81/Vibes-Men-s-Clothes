import React from "react";

// import products from "@/data/toys.json";
import ProductCard from "../carts/ProductCard";
import { getProducts } from "@/actions/server/products";

const Products = async () => {
  // const products = (await getProducts()) || {};
  const products = JSON.parse(JSON.stringify(await getProducts()));

  // console.log(products);
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10">
        Our Products {products.length}
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
