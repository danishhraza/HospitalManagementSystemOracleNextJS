import React from "react";

const PharmacyCard = ({ pharmacy }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-md m-4 w-[300px]">
      <h2 className="text-lg font-semibold mb-3">Pharmacy ID: {pharmacy.ID}</h2>
      <h2 className="text-xl font-bold mb-2">{pharmacy.PharmacyName}</h2>
      <p className="text-gray-600 mb-2">Location: {pharmacy.Location}</p>
      <p className="text-gray-600 mb-2">Contact Number: {pharmacy.ContactNumber}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default PharmacyCard;
