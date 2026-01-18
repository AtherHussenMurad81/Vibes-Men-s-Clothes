// import Link from "next/link";
import Link from "next/link";
import React from "react";
import { MdError } from "react-icons/md";
const Eror404 = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <MdError size={100} className="text-primary" />
      <h2 className="text-4xl font-bold">Page not found</h2>
      <Link href={"/"} className="btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Eror404;
