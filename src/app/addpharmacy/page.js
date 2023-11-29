"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddPharmacy = () => {
  const [pharmacyData, setPharmacyData] = useState({
    PharmacyName: "",
    Location: "",
    ContactNumber: "",
  });

  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPharmacyData({
      ...pharmacyData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/pharmacies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pharmacyData),
      });

      if (response.ok) {
        // Redirect to success page or any other handling
        router.push("/managepharmacies");
      } else {
        // Handle pharmacy creation error
        console.error("Pharmacy creation error:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating pharmacy:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto mt-[10rem] mb-10 bg-[#0F3D3E] p-10 rounded-lg flex flex-col w-[25%]">
      <h1 className="text-2xl text-white font-bold mb-8">Add A Pharmacy</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="PharmacyName" className="text-white">
            Pharmacy Name
          </label>
          <input
            type="text"
            id="PharmacyName"
            name="PharmacyName"
            value={pharmacyData.PharmacyName}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Location" className="text-white">
            Location
          </label>
          <input
            type="text"
            id="Location"
            name="Location"
            value={pharmacyData.Location}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="ContactNumber" className="text-white">
            Contact Number
          </label>
          <input
            type="text"
            id="ContactNumber"
            name="ContactNumber"
            value={pharmacyData.ContactNumber}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Pharmacy
        </button>
      </form>
    </div>
  );
};

export default AddPharmacy;
