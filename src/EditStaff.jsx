import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const EditStaff = () => {
  const { id } = useParams(); // Get the staff ID from the URL
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/staff/${id}`, formData);
      alert('Staff details updated successfully!');
      navigate('/details'); // Redirect back to staff details page
    } catch (error) {
      console.error("Error updating staff details:", error);
      alert('Failed to update staff details.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
      }}
    >
      <h2>Edit Staff Details</h2>
      <form onSubmit={handleSubmit} style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditStaff;
