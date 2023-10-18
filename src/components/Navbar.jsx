import Link from "next/link";
import Image from "next/image";
import React from "react";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="h-16 fixed left-[10%] top-4 flex justify-between items-center w-[80%] bg-[#100F0F] rounded-full p-8 z-20">
      {/* LOGO  */}
      <div>
        <Link href="/">
          <Image src="/images/logo.png" height={70} width={70} alt="" />
        </Link>
      </div>
      {/* MOBILE MENU  */}
      <div className="lg:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS  */}
      <div className="hidden lg:flex gap-4 text-white cursor-pointer">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
