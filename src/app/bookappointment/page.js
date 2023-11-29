"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { useSession } from "next-auth/react";

const Book = () => {
  const [formData, setFormData] = useState({
    DoctorID: "",
    DoctorName: "",
    AppointmentDate: "",
  });

  const [fetchedDoctorName, setFetchedDoctorName] = useState(""); // New state variable

  const router = useRouter();
  const { data: session } = useSession();
  const PatientID = session?.user?.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch DoctorName when DoctorID input changes
    if (name === "DoctorID") {
      fetchDoctorName(value);
    }
  };

  const fetchDoctorName = async (DoctorID) => {
    // Fetch DoctorName from /api/doctor
    try {
      const doctorResponse = await fetch(
        `http://localhost:3000/api/singledoctorid?DoctorID=${DoctorID}`
      );
      if (doctorResponse.ok) {
        const doctorData = await doctorResponse.json();
        // console.log(doctorData[0][2]);
        // const doctorName = doctorData.FirstName;
        const DoctorName = `${doctorData[0][2]} ${doctorData[0][3]}`;
        setFetchedDoctorName(DoctorName);
      } else {
        // Handle error when fetching DoctorName
        setFetchedDoctorName(""); // Clear the DoctorName if there is an error
      }
    } catch (error) {
      console.error("Error loading DoctorName", error);
      setFetchedDoctorName(""); // Clear the DoctorName on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      PatientID,
      DoctorID: formData.DoctorID,
      AppointmentDate: formData.AppointmentDate,
    };

    try {
      const response = await fetch("http://localhost:3000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Handle successful appointment booking
        console.log("Appointment booked successfully");
        router.push("/myappointments");
        // You can also redirect the user to a success page or display a success message.
      } else {
        // Handle error when booking appointment
        console.error("Error booking appointment");
        // You can also display an error message to the user.
      }
    } catch (error) {
      console.error("Error booking appointment", error);
      // Handle other types of errors, such as network issues.
      // You can also display an error message to the user.
    }
  };

  return (
    <div className="mx-auto mt-[10rem] mb-10 bg-[#0F3D3E] p-10 rounded-lg flex flex-col w-[25%]">
      <h1 className="text-2xl text-white font-bold mb-8">
        Book An Appointment
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="DoctorID" className="text-white">
            Doctor ID
          </label>
          <input
            type="text"
            id="DoctorID"
            name="DoctorID"
            value={formData.DoctorID}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="DoctorName" className="text-white">
            Doctor Name
          </label>
          <input
            type="text"
            id="DoctorName"
            name="DoctorName"
            value={fetchedDoctorName} // Display the fetched DoctorName
            readOnly
            className="p-1 bg-slate-300 pointer-events-none"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="AppointmentDate" className="text-white">
            Appointment Date
          </label>
          <input
            type="date"
            id="AppointmentDate"
            name="AppointmentDate"
            value={formData.AppointmentDate}
            onChange={handleChange}
            className="p-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default Book;
