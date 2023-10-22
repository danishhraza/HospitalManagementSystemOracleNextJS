import React from "react";
import AppointmentCard from "@/components/AppointmentCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getAppointment = async (PatientID) => {
  try {
    console.log("Fetching appointment for appointmentID:", PatientID);
    const res = await fetch(
      `http://localhost:3000/api/appointment?PatientID=${PatientID}`,
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
  const UserPatientID = data.user.id;
  console.log(UserPatientID);
  const appointments = await getAppointment(UserPatientID);
  console.log(appointments); // Add this line for debugging
  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#8d0c0c] p-7 w-[50%] text-white text-5xl rounded-2xl">
          <h1>Appointments History</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {appointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            appointment={{
              AppointmentID: appointment[0],
              DoctorID: appointment[1],
              PatientID: appointment[2],
              AppointmentDate: appointment[3],
              Status: appointment[4],
              MedicationPrescribed: appointment[6],
              DoctorNotes: appointment[7],
              // Add other properties as needed
            }}
          />
        ))}
      </div>
    </div>
  );
}
