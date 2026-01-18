"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
// import { handleCart } from "@/actions/server/cart"; // ✅ import

const CartButton = ({ product }) => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = status === "authenticated";

  const addToCart = async () => {
    setIsLoading(true);
    // console.log(isLogin);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      // console.log(result);

      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("Opps", "Something Wrong Happen", "error");
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callback=${path}`);
      setIsLoading(false);
    }
    // console.log(result);
  };

  return (
    <button
      onClick={addToCart}
      disabled={isLoading}
      className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
    >
      <FaShoppingCart />
      Add to Cart
      {/* {isLoading ? "Adding..." : "Add to Cart"} */}
    </button>
  );
};

export default CartButton;
