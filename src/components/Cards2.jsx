"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Cards = ({ imageSrc, title, buttonLabel }) => {
  const [slug, setSlug] = useState(""); // State to manage the input value

  const handleButtonClick = () => {
    // Handle the button click logic here
    console.log("User input (slug):", slug);
  };

  return (
    <div className="bg-[#0F3D3E] p-10 flex items-center justify-center flex-col w-[300px] rounded-lg text-center gap-4 hover:scale-105 transition-all">
      <div>
        <Image src={imageSrc} alt="" width={150} height={150} />
      </div>

      <h2 className="text-xl text-white font-semibold">{title}</h2>
      <input
        type="text"
        className="rounded-md bg-[#80a59f] border-none focus:outline-none p-1 text-white"
        value={slug}
        onChange={(e) => setSlug(e.target.value)} // Update the slug state
      />
      <Link href="/singleappointment/[slug]" as={`/singleappointment/${slug}`}>
        <button
          onClick={handleButtonClick}
          className="bg-[#E2DCC8] text-black px-4 py-2 rounded-lg mt-6 hover:bg-[#cebf90]"
        >
          {buttonLabel}
        </button>
      </Link>
    </div>
  );
};

export default Cards;
