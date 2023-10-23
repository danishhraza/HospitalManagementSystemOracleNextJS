import React from "react";
import PatientCard from "@/components/PatientCard";

const getPatients = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/patient", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch patients");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading patients", error);
    return { patients: [] }; // Return an empty array in case of error
  }
};

export default async function PatientsList() {
  const patients = await getPatients();
  console.log(patients); // Add this line for debugging
  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>All Patients</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            patient={{
              ID: patient[1],
              FirstName: patient[2],
              LastName: patient[3],
              Gender: patient[4],
              DateOfBirth: patient[5],
              ContactNumber: patient[6],
              Address: patient[7],
              // Add other properties as needed
            }}
          />
        ))}
      </div>
    </div>
  );
}
