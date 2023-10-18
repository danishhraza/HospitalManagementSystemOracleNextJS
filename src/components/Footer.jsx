import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full flex flex-col bottom-0 p-8 md:pt-20 md:px-20 bg-[#100F0F] text-white z-[-1] pb-3 border-t-8 rounded-tl-3xl rounded-tr-3xl shadow-xl">
      {/* row 1 */}
      <div className="flex gap-5 my-10 mx-5 flex-col lg:flex-row">
        {/* col 1  */}
        <div className="flex flex-col flex-1 gap-3">
          <Image src="/images/logo.png" alt="" width={200} height={200} />
          <p>
            LuxeCare Clinic is a leading healthcare center dedicated to
            providing comprehensive medical care and wellness services. Our
            mission is to offer a holistic approach to health and healing,
            ensuring the well-being of our patients at every step of their
            journey.
          </p>
        </div>
        {/* col 2  */}
        <div className="flex flex-col flex-1 lg:ml-20">
          <h3 className="font-bold text-lg">Branches</h3>
          <a
            href="https://www.google.com/maps/place/Heuser+P.E.C.H.S/@24.8784535,67.0633825,15z/data=!4m6!3m5!1s0x3eb33f476621adb9:0xf4f22c8a59b2be69!8m2!3d24.8784535!4d67.0633825!16s%2Fg%2F11pzg78j3j"
            target="_blank"
          >
            <h3 className="font-bold">Askari Branch</h3>
          </a>
          <p className="text-sm my-1">25, Block 5, Askari</p>
          <p className="text-sm my-1">Karachi, Pakistan</p>
          <br />
          <a
            href="https://www.google.com/maps/place/HEUSER/@24.8051546,67.0280607,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33d5b21b2efc9:0x9d20b9a805847b41!8m2!3d24.8051497!4d67.0302494!16s%2Fg%2F11qyd3v6ww"
            target="_blank"
          >
            <h3 className="font-bold text-lg">Clifton Branch</h3>
          </a>
          <p className="text-sm my-1">D55, Block 4 Clifton</p>
          <p className="text-sm my-1">Karachi, Pakistan</p>
        </div>
        {/* col 3  */}
        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-lg">Contact Us</h3>
          <a href="mailto:info@luxecare.com">
            <p className="text-sm underline my-1">info@luxecare.com</p>
          </a>
          <a href="tel:+923356598678">
            <h4 className="text-sm font-bold my-1">+923355558678</h4>
          </a>
          <br />
        </div>
      </div>
      {/* row 2  */}
      <br />
      <hr />
      <br />
      <p className="text-center my-2">Copyright © {currentYear} LuxeCare</p>
    </div>
  );
};

export default Footer;
