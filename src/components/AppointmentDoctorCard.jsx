import React from "react";

const AppointmentDoctorCard = ({ appointment }) => {


  return (
    <div className="flex justify-center">
      <div className="bg-white border border-red-700 p-4 rounded shadow-md m-4 w-[500px] mb-10">
        <h2 className="mb-2">
          <span className="font-semibold">Appointment ID:</span>{" "}
          {appointment.AppointmentID}
        </h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Patient ID:</span>{" "}
          {appointment.PatientID}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Doctor ID:</span>{" "}
          {appointment.DoctorID}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Appointment Date:</span>{" "}
          {appointment.AppointmentDate}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Status:</span> {appointment.Status}
        </p>
        {appointment.MedicationPrescribed && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Medication Prescribed:</span>{" "}
            {appointment.MedicationPrescribed}
          </p>
        )}
        {appointment.DoctorNotes && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Doctor Notes:</span>{" "}
            {appointment.DoctorNotes}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentDoctorCard;
