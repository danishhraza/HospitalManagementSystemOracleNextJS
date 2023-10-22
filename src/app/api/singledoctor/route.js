/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }
    const url = new URL(req.url);
    const UserID = url.searchParams.get("UserID");

    // Get the UserID from the param

    // Handle GET request to retrieve appointments
    const query = `SELECT * FROM DOCTOR WHERE UserID = :UserID`;
    const result = await db.execute(
      query,
      { UserID },
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
