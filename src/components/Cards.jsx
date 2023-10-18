import React from "react";
import Image from "next/image";

const Cards = ({ imageSrc, title, buttonLabel, buttonHref }) => {
  return (
    <div className="bg-[#0F3D3E] p-10 flex items-center justify-center flex-col w-[300px] rounded-lg text-center gap-4 hover:scale-105 transition-all">
      <div>
        <Image src={imageSrc} alt="" width={150} height={150} />
      </div>

      <h2 className="text-xl text-white font-semibold">{title}</h2>
      <a href={buttonHref}>
        <button className="bg-[#E2DCC8] text-black px-4 py-2 rounded-lg mt-6 hover:bg-[#cebf90]">
          {buttonLabel}
        </button>
      </a>
    </div>
  );
};

export default Cards;
