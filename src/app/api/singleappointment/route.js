/* eslint-disable import/no-anonymous-default-export */
import { connectToDatabase } from "../../../libs/oracledb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  console.log("GET request received"); // Add this line
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }
    const url = new URL(req.url);
    const AppointmentID = url.searchParams.get("AppointmentID");

    // Get the PatientID from the param

    // Handle GET request to retrieve appointments
    const query = `SELECT * FROM APPOINTMENT WHERE AppointmentID = :AppointmentID`;
    const result = await db.execute(
      query,
      { AppointmentID },
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

export const PATCH = async (req, res) => {
  console.log("PATCH request received");
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    const body = await req.json();

    console.log(body);
  
    const { AppointmentID, newStatus } = body;

    const query = `UPDATE APPOINTMENT SET Status = :newStatus WHERE AppointmentID = :AppointmentID`;
    const result = await db.execute(
      query,
      { newStatus, AppointmentID },
      {
        autoCommit: true,
      }
    );

    db.release();

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
