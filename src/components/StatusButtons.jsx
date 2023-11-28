"use client"
import { useState } from 'react';

const StatusButtons = ({ appointmentID, handleStatusUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (status) => {
    setLoading(true);
    try {
      await handleStatusUpdate(appointmentID, status);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-buttons">
      <button disabled={loading} onClick={() => handleClick('Pending Approval')}>
        Pending Approval
      </button>
      <button disabled={loading} onClick={() => handleClick('Confirmed')}>
        Confirmed
      </button>
      {/* Add other buttons as needed */}
    </div>
  );
};

export default StatusButtons;
