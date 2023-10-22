"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Gender: "",
    DateOfBirth: "",
    ContactNumber: "",
    Address: "",
    Password: "",
  });

  const router = useRouter();
  const [UserID, setUserID] = useState(null); // New state to store UserID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserRegistration = async () => {
    try {
      // Send a POST request to create a new user
      const response = await fetch("http://localhost:3000/api/singleuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.Email,
          Password: formData.Password,
        }),
      });

      if (response.ok) {
        // Registration successful, proceed to get UserID
        try {
          const userResponse = await fetch(
            `http://localhost:3000/api/singleuser?Email=${formData.Email}`,
            {
              cache: "no-store",
            }
          );

          if (userResponse.ok) {
            const userData = await userResponse.json();
            const userID = userData[0][0]; // Set the UserID from the response
            setUserID(userID);

            // Step 2: Continue with creating the patient
            handlePatientCreation(userID);
          } else {
            // Handle error when fetching UserID
          }
        } catch (error) {
          console.error("Error loading user", error);
        }
      } else {
        // Handle user creation error
      }
    } catch (error) {
      console.error("User registration error:", error);
    }
  };

  const handlePatientCreation = async (userID) => {
    // Send a POST request to create a new patient with the acquired UserID
    try {
      const patientResponse = await fetch("http://localhost:3000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserID: userID,
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          Gender: formData.Gender,
          DateOfBirth: formData.DateOfBirth,
          ContactNumber: formData.ContactNumber,
          Address: formData.Address,
        }),
      });

      if (patientResponse.ok) {
        // Registration and patient creation successful
        // You can redirect the user to a success page here
        router.push("http://localhost:3000/api/auth/signin");
      } else {
        // Handle patient creation error
      }
    } catch (error) {
      console.error("Patient creation error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Start the user registration process
    handleUserRegistration();
  };

  return (
    <div className="mx-auto mt-[10rem] mb-10 bg-[#0F3D3E] p-10 rounded-lg flex flex-col w-[25%]">
      <h1 className="text-2xl text-white font-bold mb-8">
        Register To LuxeCare
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="FirstName" className="text-white">
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
            className="p-1"
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="LastName" className="text-white">
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            className="p-1"
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Email" className="text-white">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="p-1"
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label className="text-white">Gender</label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="Male"
              name="Gender"
              value="Male"
              checked={formData.Gender === "Male"}
              onChange={handleChange}
              className="text-indigo-600 border-gray-300 focus:ring-indigo-200"
            />
            <label htmlFor="Male" className="text-white">
              Male
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="Female"
              name="Gender"
              value="Female"
              checked={formData.Gender === "Female"}
              onChange={handleChange}
              className="text-indigo-600 border-gray-300 focus:ring-indigo-200"
            />
            <label htmlFor="Female" className="text-white">
              Female
            </label>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="DateOfBirth" className="text-white">
            Date of Birth
          </label>
          <input
            type="date"
            id="DateOfBirth"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
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
            className="p-1"
            value={formData.ContactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Address" className="text-white">
            Address
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            className="p-1"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="Password" className="text-white">
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="Password"
            className="p-1"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
