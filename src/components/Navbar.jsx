"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSession, SessionProvider } from "next-auth/react"; // Import SessionProvider
import PersonIcon from "@mui/icons-material/Person";

import Menu from "./Menu";

const Navbar = () => {
  const { data: session } = useSession();
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
      <div className="hidden lg:flex gap-4 text-white cursor-pointer items-center">
        <Link href="/">Home</Link>
        {session ? (
          <div className="flex gap-2">
            <Link href="/api/auth/signout" className="flex items-center">
              Logout
            </Link>
            <div className="flex gap-2 bg-white rounded-lg p-[7px] text-black ml-2">
              <p>
                {session.user.role !== "admin"
                  ? session.user.firstName
                  : "Admin"}
              </p>
              <PersonIcon />
            </div>
          </div>
        ) : (
          <>
            <Link href="/api/auth/signin">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
