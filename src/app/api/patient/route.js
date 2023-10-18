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
    FirstName,
    LastName,
    Gender,
    Email,
    Password,
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
      INSERT INTO APPOINTMENT (FirstName, LastName, Gender, Email, Password, DateOfBirth, ContactNumber, Address)
      VALUES (:FirstName, :LastName, :Gender, :Email, :Password, :DateOfBirth, :ContactNumber, :Address)
    `,
      {
        FirstName,
        LastName,
        Gender,
        Email,
        Password,
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
      { message: "Appointment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
