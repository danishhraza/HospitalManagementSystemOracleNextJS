import React from "react";
import ProcedureCard from "@/components/ProcedureCard";

const getProcedures = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/procedures", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch procedures");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading procedures", error);
    return { procedures: [] }; // Return an empty array in case of error
  }
};

export default async function ProceduresList() {
  const procedures = await getProcedures();
  console.log(procedures); // Add this line for debugging
  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>Available Procedures</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {procedures.map((procedure, index) => (
          <ProcedureCard
            key={index}
            procedure={{
              ID: procedure[0],
              ProcedureName: procedure[1],
              Description: procedure[2],
              Price: procedure[3],
              DoctorID: procedure[4],
              // Add other properties as needed
            }}
          />
        ))}
      </div>
    </div>
  );
}
