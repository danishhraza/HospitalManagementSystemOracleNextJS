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
    <div className="container mx-auto mt-[10rem]">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            required
            className="border-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Gender">Gender</label>
          <input
            type="text"
            id="Gender"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="DateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="DateOfBirth"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ContactNumber">Contact Number</label>
          <input
            type="text"
            id="ContactNumber"
            name="ContactNumber"
            value={formData.ContactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="Password"
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
