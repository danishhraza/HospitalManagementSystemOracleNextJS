"use client"
import React, { useState } from "react";

const StatusUpdateForm = () => {
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Pending Approval');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!appointmentNumber) {
      // Handle validation or show an error message
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/singleappointment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          AppointmentID: appointmentNumber,
          newStatus: selectedStatus,
        }),
      });

      if (res.ok) {
        // Handle success response
        console.log('Status updated successfully');
        // Optionally reset form fields or update UI
        setAppointmentNumber('');
        setSelectedStatus('Pending Approval');
      } else {
        // Handle error scenarios
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-[10rem]">
      <h1>Update Appointment Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Appointment Number:
          <input
            type="text"
            value={appointmentNumber}
            className="ml-2 border-2 border-black rounded-lg px-1 w-20 my-3"
            onChange={(e) => setAppointmentNumber(e.target.value)}
          />
        </label>
        <div className="flex flex-col">
          <label>
            <input
              type="radio"
              value="Pending Approval"
              checked={selectedStatus === 'Pending Approval'}
              onChange={() => setSelectedStatus('Pending Approval')}
            />
            Pending Approval
          </label>
          <label>
            <input
              type="radio"
              value="Confirmed"
              checked={selectedStatus === 'Confirmed'}
              onChange={() => setSelectedStatus('Confirmed')}
            />
            Confirmed
          </label>
          <label>
            <input
              type="radio"
              value="Completed"
              checked={selectedStatus === 'Completed'}
              onChange={() => setSelectedStatus('Completed')}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              value="Canceled"
              checked={selectedStatus === 'Canceled'}
              onChange={() => setSelectedStatus('Canceled')}
            />
            Canceled
          </label>
          <label>
            <input
              type="radio"
              value="Missed"
              checked={selectedStatus === 'Missed'}
              onChange={() => setSelectedStatus('Missed')}
            />
            Missed
          </label>
        </div>
        <button className="bg-black p-2 mt-3 text-white rounded-lg" type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default StatusUpdateForm;
