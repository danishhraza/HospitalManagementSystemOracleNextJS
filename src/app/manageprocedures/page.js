/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import { useState, useEffect } from "react";
import ProcedureCard from "@/components/ProcedureCard";
import { useSession, SessionProvider } from "next-auth/react";

const getProcedures = async (doctorID) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/singleprocedures/?DoctorID=${doctorID}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch procedures");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading procedures", error);
    return { procedures: [] };
  }
};

const deleteProcedure = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/procedures/?PROCEDUREID=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete procedure");
    }
    console.log(`Procedure with ID ${id} deleted`);
    return true;
  } catch (error) {
    console.log("deleting", id);
    console.error("Error deleting procedure", error);
    return false;
  }
};

export default function ProceduresList() {
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const fetchedProcedures = await getProcedures(session.user.id);
          setProcedures(fetchedProcedures);
        } catch (error) {
          console.error("Error fetching procedures:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [status, session]);

  const handleDelete = async (id) => {
    const isDeleted = await deleteProcedure(id);
    if (isDeleted) {
      const updatedProcedures = procedures.filter(
        (procedure) => procedure.ID !== id
      );
      setProcedures(updatedProcedures);
      console.log("Updated procedures:", updatedProcedures);
    }
  };

  if (loading || status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>Manage Procedures</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {procedures.map((procedure, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleDelete(procedure[0])}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <ProcedureCard
              procedure={{
                ID: procedure[0],
                ProcedureName: procedure[1],
                Description: procedure[2],
                Price: procedure[3],
                DoctorID: procedure[4],
                // Add other properties as needed
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
