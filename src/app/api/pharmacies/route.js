/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Handle GET request to retrieve pharmacies
    const query = "SELECT * FROM PHARMACY";
    const result = await db.execute(`SELECT * FROM PHARMACY`, [], {
      outFormat: db.OUT_FORMAT_OBJECT,
    });
    // Release the database connection
    db.release();

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req, res) => {
  const body = await req.json();

  console.log(body);

  const { PharmacyName, Location, ContactNumber } = body;

  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Create an INSERT query
    const result = await db.execute(
      `
      INSERT INTO PHARMACY (PharmacyName, Location, ContactNumber)
      VALUES (:PharmacyName, :Location, :ContactNumber)
    `,
      {
        PharmacyName,
        Location,
        ContactNumber,
      },
      { outFormat: db.OUT_FORMAT_OBJECT, autoCommit: true }
    );

    console.log("Database insertion result:", result);

    // Release the database connection
    db.release();

    return NextResponse.json(
      { message: "Pharmacy created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
