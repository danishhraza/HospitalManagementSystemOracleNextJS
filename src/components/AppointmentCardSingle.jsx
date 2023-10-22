"use client";
import React from "react";

const AppointmentCardSingle = ({ appointment }) => {
  appointment = appointment;
  console.log(appointment);
  return (
    <div className="flex justify-center">
      <div className="bg-white border border-red-700 p-4 rounded shadow-md m-4 w-[500px] mb-10">
        <h2 className="mb-2">
          <span className="font-semibold">Appointment ID:</span>{" "}
          {appointment[0]}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Patient ID:</span> {appointment[1]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Doctor ID:</span> {appointment[2]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Appointment Date:</span>{" "}
          {appointment[3]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Status:</span> {appointment[4]}
        </p>
        {appointment[5] && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Medication Prescribed:</span>{" "}
            {appointment[5]}
          </p>
        )}
        {appointment[6] && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Doctor Notes:</span>{" "}
            {appointment[6]}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentCardSingle;
