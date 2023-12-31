/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Handle GET request to retrieve appointments
    const query = "SELECT * FROM PATIENT";
    const result = await db.execute(`SELECT * FROM PATIENT`, [], {
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

  const {
    UserID,
    FirstName,
    LastName,
    Gender,
    DateOfBirth,
    ContactNumber,
    Address,
  } = body;

  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Create an INSERT query for appointments
    const result = await db.execute(
      `
      INSERT INTO PATIENT (UserID, FirstName, LastName, Gender, DateOfBirth, ContactNumber, Address)
      VALUES (:UserID, :FirstName, :LastName, :Gender, TO_DATE(:DateOfBirth, 'YYYY-MM-DD'), :ContactNumber, :Address)
    `,
      {
        UserID,
        FirstName,
        LastName,
        Gender,
        DateOfBirth,
        ContactNumber,
        Address,
      },
      { outFormat: db.OUT_FORMAT_OBJECT, autoCommit: true }
    );

    console.log("Database insertion result:", result);

    // Release the database connection
    db.release();

    return NextResponse.json(
      { message: "Patient created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
