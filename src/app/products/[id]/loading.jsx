const ProductDetailsLoading = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-[420px] bg-gray-300 rounded-xl"></div>

      {/* Info Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-3/4 bg-gray-300 rounded"></div>

        {/* Rating */}
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Price */}
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>

        {/* Button */}
        <div className="h-12 w-40 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Description + Extra */}
      <div className="col-span-full space-y-6 mt-8">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Key Features */}
        <div>
          <div className="h-5 w-40 bg-gray-300 rounded mb-3"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-3/4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>

        {/* Q&A */}
        <div>
          <div className="h-5 w-32 bg-gray-300 rounded mb-3"></div>
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;
