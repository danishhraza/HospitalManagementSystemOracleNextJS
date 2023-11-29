"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

const Register = () => {
  const [procedureData, setProcedureData] = useState({
    ProcedureName: "",
    Description: "",
    Price: "",
    DoctorID: "",
  });

  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(false);
      setProcedureData((prevData) => ({
        ...prevData,
        DoctorID: session.user.id,
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedureData({
      ...procedureData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/procedures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(procedureData),
      });

      if (response.ok) {
        // Redirect to success page or any other handling
        router.push("/manageprocedures");
      } else {
        // Handle procedure creation error
        console.error("Procedure creation error:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating procedure:", error);
    }
  };

  if (loading) {
    // You can show a loading indicator here until the session is available
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto mt-[10rem] mb-10 bg-[#0F3D3E] p-10 rounded-lg flex flex-col w-[25%]">
      <h1 className="text-2xl text-white font-bold mb-8">Add A Procedure</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="ProcedureName" className="text-white">
            Procedure Name
          </label>
          <input
            type="text"
            id="ProcedureName"
            name="ProcedureName"
            value={procedureData.ProcedureName}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Description" className="text-white">
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            value={procedureData.Description}
            onChange={handleChange}
            className="p-1"
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Price" className="text-white">
            Price
          </label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={procedureData.Price}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="DoctorID" className="text-white">
            Doctor ID
          </label>
          <input
            type="text"
            id="DoctorID"
            name="DoctorID"
            value={session.user.id}
            onChange={handleChange}
            required
            className="p-1 bg-gray-300 disabled pointer-events-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Procedure
        </button>
      </form>
    </div>
  );
};

export default Register;
