import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white border-2 border-dashed border-red-700 p-4 rounded shadow-md m-4 w-[300px]">
      <h2 className="text-l font-semibold mb-6">Doctor ID: {doctor.ID}</h2>
      <h2 className="text-xl font-bold">
        {doctor.FirstName} {doctor.LastName}
      </h2>
      <p className="text-gray-600 mb-2">{doctor.Gender}</p>
      <p className="text-gray-600 mb-2">{doctor.Email}</p>
      <p className="text-gray-600 mb-2">{doctor.ContactNumber}</p>
      <p className="text-indigo-600 font-medium">{doctor.Specialization}</p>
    </div>
  );
};

export default DoctorCard;