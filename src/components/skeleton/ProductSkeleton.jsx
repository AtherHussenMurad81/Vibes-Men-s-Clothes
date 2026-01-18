import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse p-4">
      <div className="bg-gray-200 h-48 w-full rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
      <div className="h-8 bg-gray-200 rounded mt-2"></div>
    </div>
  );
};

export default ProductSkeleton;
