"use client";
import React, { useState, useEffect } from "react";
import PharmacyCard from "@/components/PharmacyCard"; // Assuming PharmacyCard component is available

const getPharmacies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/pharmacies", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch pharmacies");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error loading pharmacies", error);
    return { pharmacies: [] }; // Return an empty array in case of error
  }
};

export default function PharmaciesList() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPharmacies = await getPharmacies();
        setPharmacies(fetchedPharmacies);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/pharmacies/?PharmacyID=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete pharmacy");
      }
      console.log(`Pharmacy with ID ${id} deleted`);

      const updatedPharmacies = pharmacies.filter(
        (pharmacy) => pharmacy.ID !== id
      );
      setPharmacies(updatedPharmacies);
      console.log("Updated pharmacies:", updatedPharmacies);
    } catch (error) {
      console.error("Error deleting pharmacy", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>Manage Pharmacies</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {pharmacies.map((pharmacy, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => handleDelete(pharmacy[0])}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <PharmacyCard
              pharmacy={{
                ID: pharmacy[0],
                PharmacyName: pharmacy[1],
                Location: pharmacy[2],
                ContactNumber: pharmacy[3],
                // Add other properties as needed
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
