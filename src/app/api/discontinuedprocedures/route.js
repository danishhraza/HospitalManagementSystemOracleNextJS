/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Handle GET request to retrieve procedures
    const query = "SELECT * DISCONTINUED_PROCEDURES";
    const result = await db.execute(
      `SELECT * FROM DISCONTINUED_PROCEDURES`,
      [],
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
