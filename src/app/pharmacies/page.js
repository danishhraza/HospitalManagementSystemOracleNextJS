import React from "react";
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

export default async function PharmaciesList() {
  const pharmacies = await getPharmacies();
  console.log(pharmacies); // Add this line for debugging
  return (
    <div className="mt-[9rem]">
      <div className="flex justify-center mb-10">
        <div className="text-center bg-[#0F3D3E] p-7 w-[50%] text-white text-5xl rounded-2xl backdrop-blur-lg">
          <h1>Affiliated Pharmacies</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        {pharmacies.map((pharmacy, index) => (
          <PharmacyCard
            key={index}
            pharmacy={{
              ID: pharmacy[0],
              PharmacyName: pharmacy[1],
              Location: pharmacy[2],
              ContactNumber: pharmacy[3],
              // Add other properties as needed
            }}
          />
        ))}
      </div>
    </div>
  );
}
