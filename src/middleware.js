import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth);

    // Allow access to the home page without authentication
    if (req.nextUrl.pathname === "/") {
      return;
    }

    if (
      (req.nextUrl.pathname === "/myappointment" ||
        req.nextUrl.pathname === "/bookappointment") &&
      req.nextauth.token?.role !== "patient"
    ) {
      return new NextResponse("You are not authorized!");
    }

    if (
      (req.nextUrl.pathname === "/patients" ||
        req.nextUrl.pathname === "/myappointmentsdoctor"||
        req.nextUrl.pathname === "/updateappointment"||
        req.nextUrl.pathname === "/addprocedure") &&
      req.nextauth.token?.role !== "doctor"
    ) {
      return new NextResponse("You are not authorized!");
    }

    if (
      (req.nextUrl.pathname === "/adddoctor" ||
        req.nextUrl.pathname === "/addpharmacy") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/patients",
    "/myappointment",
    "/bookappointment",
    "/myappointmentsdoctor",
    "/updateappointment",
    "/adddoctor",
    "/addpharmacy",
    "/addprocedure",
  ],
};
