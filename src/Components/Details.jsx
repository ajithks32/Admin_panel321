import React, { useState } from 'react';
import { Button } from '@mui/material';
import Studentdetails from './Studentdetails';
import Staffdetails from './Staffdetails';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import './details.css'; // Import CSS for styling

const Details = () => {
  let navigate = useNavigate();
  const [showStaff, setShowStaff] = useState(false);

  const handleStudentClick = () => setShowStaff(false);
  const handleStaffClick = () => setShowStaff(true);

  return (
    <div className="homepage">
      <div className="details-container">
        <div className="details-buttons">
          <Button
            variant="contained"
            color={showStaff ? "default" : "primary"}
            onClick={handleStudentClick}
            className="details-btn"
          >
            Student Details
          </Button>
          <Button
            variant="contained"
            color={showStaff ? "primary" : "default"}
            onClick={handleStaffClick}
            className="details-btn"
          >
            Staff Details
          </Button>
        </div>
        <div className="add-buttons">
          <Button
            onClick={() => navigate('/addstaff')}
            className="add-btn"
          >
            <FaPlus /> Add Staff
          </Button>
          <Button
            onClick={() => navigate('/addstudent')}
            className="add-btn"
          >
            <FaPlus /> Add Student
          </Button>
        </div>
      </div>
      {showStaff ? <Staffdetails /> : <Studentdetails />}
    </div>
  );
};

export default Details;
