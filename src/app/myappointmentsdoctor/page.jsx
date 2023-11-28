import React from "react";
import AppointmentDoctorCard from "@/components/AppointmentDoctorCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getAppointment = async (DoctorID) => {
  try {
    console.log("Fetching appointment for DoctorID:", DoctorID);
    const res = await fetch(
      `http://localhost:3000/api/appointmentdoctor?DoctorID=${DoctorID}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading appointments", error);
    return { appointments: [] }; // Return an empty array in case of error
  }
};


export default async function AppointmentsList() {
  const data = await getServerSession(authOptions);
  const UserDoctorID = data.user.id;
  console.log(UserDoctorID);
  const appointments = await getAppointment(UserDoctorID);
  console.log(appointments); // Add this line for debugging



  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#8d0c0c] p-7 w-[50%] text-white text-5xl rounded-2xl">
          <h1>Appointments History</h1>
        </div>
      </div>
      <div className="flex justify-items-start justify-center flex-wrap mb-10 mx-10">
        {appointments.map((appointment, index) => (
          <AppointmentDoctorCard
            key={index}
            appointment={{
              AppointmentID: appointment[0],
              DoctorID: appointment[2],
              PatientID: appointment[1],
              AppointmentDate: appointment[3],
              Status: appointment[4],
              MedicationPrescribed: appointment[5],
              DoctorNotes: appointment[6],
            }}
          />
        ))}
      </div>
    </div>
  );
}
