import { banglaFont } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MensBanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-10 rounded-3xl shadow-lg">
      {/* Left Content */}
      <div className="flex-1 space-y-6 md:pr-10">
        <h2
          className={`text-5xl md:text-6xl font-bold ${banglaFont.className} leading-tight`}
        >
          <span className="text-primary">স্টাইলিশ</span> পুরুষদের পোশাক
        </h2>
        <p className="text-gray-600 text-lg md:text-xl">
          অফিস থেকে ক্যাজুয়াল, হালকা থেকে উষ্ণ সব ধরনের পোশাক এক জায়গায়। এখন
          কিনুন বিশেষ ডিসকাউন্টে!
        </p>
        <Link href={"products"} className="btn btn-primary btn-outline btn-lg">
          এক্সপ্লোর করুন
        </Link>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-8 md:mt-0 relative w-full h-[400px] md:h-[500px]">
        <Image
          src="/assets/mens.png"
          alt="Mens Clothing Banner"
          fill
          className="object-cover rounded-3xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default MensBanner;
