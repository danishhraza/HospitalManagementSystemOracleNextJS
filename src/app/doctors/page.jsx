import React from "react";
import DoctorCard from "@/components/DoctorCard";

const getDoctors = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/doctor", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading doctors", error);
    return { doctors: [] }; // Return an empty array in case of error
  }
};

export default async function DoctorsList() {
  const doctors = await getDoctors();
  console.log(doctors); // Add this line for debugging
  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>Available Doctors</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            doctor={{
              ID: doctor[1],
              FirstName: doctor[2],
              LastName: doctor[3],
              Gender: doctor[4],
              Email: doctor[5],
              ContactNumber: doctor[5],
              Specialization: doctor[6],
              // Add other properties as needed
            }}
          />
        ))}
      </div>
    </div>
  );
}
