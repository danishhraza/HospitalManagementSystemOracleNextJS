"use client";
import React, { useEffect, useState } from "react";
import AppointmentCardSingle from "@/components/AppointmentCardSingle";
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
    console.error("Error loading appointment", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default function SingleAppointment() {
  const pathname = usePathname();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Split the URL by "/"
    const parts = pathname.split("/");
    const index = parts.indexOf("singleappointment");

    const fetchData = async () => {
      if (index !== -1 && index < parts.length - 1) {
        const result = parts[index + 1];
        try {
          const data = await getAppointment(result);
          setAppointment(data);
        } catch (error) {
          console.error("Error:", error);
          setAppointment(null); // Set it to null in case of an error
        } finally {
          setLoading(false); // Mark loading as complete, whether successful or not
        }
      } else {
        setAppointment(null);
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (appointment === null) {
    return <div>Appointment not found or an error occurred.</div>;
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
        <AppointmentCardSingle appointment={appointment[0]} />
      </div>
    </div>
  );
}
