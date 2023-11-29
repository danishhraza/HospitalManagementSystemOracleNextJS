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
    const query = "SELECT * FROM PROCEDURE";
    const result = await db.execute(`SELECT * FROM PROCEDURE`, [], {
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

  const { ProcedureName, Description, Price, DoctorID } = body;

  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    // Create an INSERT query
    const result = await db.execute(
      `
      INSERT INTO PROCEDURE (ProcedureName, Description, Price, DoctorID)
      VALUES (:ProcedureName, :Description, :Price, :DoctorID)
    `,
      {
        ProcedureName,
        Description,
        Price,
        DoctorID,
      },
      { outFormat: db.OUT_FORMAT_OBJECT, autoCommit: true }
    );

    console.log("Database insertion result:", result);

    // Release the database connection
    db.release();

    return NextResponse.json(
      { message: "Procedure created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  try {
    const db = await connectToDatabase();
    if (!db) {
      throw new Error("Database connection is not established.");
    }

    const url = new URL(req.url);
    const PROCEDUREID = url.searchParams.get("PROCEDUREID");
    console.log(PROCEDUREID);

    // Perform the DELETE operation based on the provided procedure ID
    const result = await db.execute(
      `DELETE FROM PROCEDURE WHERE PROCEDUREID = :PROCEDUREID`,
      {
        PROCEDUREID,
      },
      { autoCommit: true }
    );

    console.log("Database deletion result:", result);

    // Release the database connection
    db.release();

    if (result.rowsAffected && result.rowsAffected === 1) {
      return NextResponse.json(
        { message: "Procedure deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Procedure with the provided ID not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in DELETE method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
