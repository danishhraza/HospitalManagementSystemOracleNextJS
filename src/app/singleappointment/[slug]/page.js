"use client";
import React, { useEffect, useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import { usePathname } from "next/navigation";

// Function to fetch appointment data by ID
const getAppointment = async (appointmentID) => {
  console.log("Fetching appointment for appointmentID:", appointmentID);
  try {
    const res = await fetch(
      `http://localhost:3000/api/singleappointment?AppointmentID=${appointmentID}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the appointment");
    }
    const data = await res.json();
    console.log("Fetched appointment data:", data);
    return data;
  } catch (error) {
    console.log("Error loading appointment", error);
    return null; // Return null in case of error
  }
};

export default function SingleAppointment() {
  const pathname = usePathname();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Split the URL by "/"
    const parts = pathname.split("/");
    const index = parts.indexOf("singleappointment");

    if (index !== -1 && index < parts.length - 1) {
      const result = parts[index + 1];
      getAppointment(result)
        .then((data) => {
          if (data) {
            setAppointment(data);
          } else {
            // Handle the case where the appointment is not found
            setAppointment(null); // You can set it to null to display an error message
          }
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
        });
    } else {
      // Handle the case where "singleappointment" is not found in the URL
      setAppointment(null); // You can set it to null to display an error message
    }
  }, [pathname]);

  if (appointment === null) {
    return <div>Appointment not found or an error occurred.</div>;
  } else if (appointment === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-9rem">
      {/* Your appointment rendering code here */}
      <div className="mt-9rem">
        <div className="flex justify-center mb-10">
          <div className="text-center p-7 w-50% text-white text-5xl rounded-2xl">
            <h1>Appointment Details</h1>
          </div>
        </div>
        <AppointmentCard appointment={appointment} />
      </div>
    </div>
  );
}
