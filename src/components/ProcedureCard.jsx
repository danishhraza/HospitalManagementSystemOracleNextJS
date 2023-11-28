import React from "react";

const ProcedureCard = ({ procedure }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md m-4 w-[300px]">
      <h2 className="text-lg font-semibold mb-3">Procedure ID: {procedure.ID}</h2>
      <h2 className="text-xl font-bold mb-2">{procedure.ProcedureName}</h2>
      <p className="text-gray-600 mb-2">{procedure.Description}</p>
      <p className="text-gray-600 mb-2">${procedure.Price}</p>
      <p className="text-gray-600 mb-2">Doctor ID: {procedure.DoctorID}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default ProcedureCard;
