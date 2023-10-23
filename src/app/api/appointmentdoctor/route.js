/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (req, res) => {
  console.log("GET request received"); // Add this line
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }
    const url = new URL(req.url);
    const DoctorID = url.searchParams.get("DoctorID");

    // Get the DoctorID from the param

    // Handle GET request to retrieve appointments
    const query = `SELECT * FROM APPOINTMENT WHERE DoctorID = :DoctorID ORDER BY AppointmentDate DESC`;
    console.log(query);
    const result = await db.execute(
      query,
      { DoctorID },
      {
        outFormat: db.OUT_FORMAT_OBJECT,
      }
    );

    // Release the database connection
    db.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
