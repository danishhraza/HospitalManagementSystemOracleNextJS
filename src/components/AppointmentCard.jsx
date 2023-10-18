"use client";
import React from "react";

const AppointmentCard = ({ appointment }) => {
  const appointments = appointment[0];
  return (
    <div className="flex justify-center">
      <div className="bg-white border border-red-700 p-4 rounded shadow-md m-4 w-[500px] mb-10">
        <h2 className="mb-2">
          <span className="font-semibold">Appointment ID:</span>{" "}
          {appointments[0]}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Patient ID:</span> {appointments[1]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Doctor ID:</span> {appointments[2]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Appointment Date:</span>{" "}
          {appointments[3]}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Status:</span> {appointments[4]}
        </p>
        {appointments[5] && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Medication Prescribed:</span>{" "}
            {appointments[5]}
          </p>
        )}
        {appointments[6] && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Doctor Notes:</span>{" "}
            {appointments[6]}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
