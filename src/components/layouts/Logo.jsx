import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const nav = (
    <>
      <li>
        <Link></Link>
      </li>
    </>
  );

  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        alt="logo-hero-kids"
        src={"/assets/logos.png"}
        width={50}
        height={40}
      ></Image>
      <h2 className="text-xl font-bold">
        Vibes <span className="text-primary">Men's Ware</span>
      </h2>
    </Link>
  );
};

export default Logo;
