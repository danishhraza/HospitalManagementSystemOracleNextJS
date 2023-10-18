"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "hamburger-react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Login", url: "/about" },
  { id: 2, title: "Register", url: "/register" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Use the Hamburger component */}
      <div className="relative z-10">
        <Hamburger
          toggled={open}
          toggle={setOpen}
          size={30}
          duration={0.5}
          color="#fff"
        />
      </div>
      {open && (
        <div className="flex flex-col top-[-16px] bg-black/60 backdrop-blur-lg font-[600] text-white text-center items-center absolute left-[-12.5%] h-[100vh] w-[100vw] justify-center gap-8 text-2xl">
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              // style={{ zIndex: "30" }}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
