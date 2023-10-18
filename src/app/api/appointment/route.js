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
    const PatientID = url.searchParams.get("PatientID");

    // Get the PatientID from the param

    // Handle GET request to retrieve appointments
    const query = `SELECT * FROM APPOINTMENT WHERE PatientID = :PatientID`;
    console.log(query);
    const result = await db.execute(
      query,
      { PatientID },
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

export const POST = async (req, res) => {
  const body = await req.json();

  console.log(body);

  const {
    DoctorID,
    PatientID,
    AppointmentDate,
    Status,
    MedicationPrescribed,
    DoctorNotes,
  } = body;

  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Create an INSERT query for appointments
    const result = await db.execute(
      `
      INSERT INTO APPOINTMENT (DoctorID, PatientID, AppointmentDate, Status, MedicationPrescribed, DoctorNotes)
      VALUES (:DoctorID, :PatientID, :AppointmentDate, :Status, :MedicationPrescribed, :DoctorNotes)
    `,
      {
        DoctorID,
        PatientID,
        AppointmentDate,
        Status,
        MedicationPrescribed,
        DoctorNotes,
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
