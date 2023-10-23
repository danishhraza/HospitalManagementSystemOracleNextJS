import React from "react";

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-gray-00 border-2 border-dashed border-[#0F3D3E] p-4 rounded shadow-2xl m-4 w-[300px]">
      <h2 className="text-l font-semibold mb-6">Patient ID: {patient.ID}</h2>
      <h2 className="text-xl font-bold">
        {patient.FirstName} {patient.LastName}
      </h2>
      <p className="text-gray-600 mb-2">Gender: {patient.Gender}</p>
      <p className="text-gray-600 mb-2">Date Of Birth: {patient.DateOfBirth}</p>
      <p className="text-gray-600 mb-2">
        Contact Number: {patient.ContactNumber}
      </p>
      <p className="text-red-600 font-medium">Address: {patient.Address}</p>
    </div>
  );
};

export default PatientCard;
