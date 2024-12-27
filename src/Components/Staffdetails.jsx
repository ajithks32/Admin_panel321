import React, { useState, useEffect } from 'react';
import { MdDeleteSweep } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa'; // Import edit icon
import axios from 'axios';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./details.css";


// Yup validation schema for staff
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(/^[a-z0-9._%+-]+@gmail\.com$/, 'Email must be in lowercase and end with @gmail.com')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone is required'),
  role: Yup.string().required('Role is required'),
});

const Staffdetails = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedStaff, setUpdatedStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  const theme = useTheme();

  useEffect(() => {
    axios
      .get('http://localhost:5000/staff')
      .then((response) => {
        setStaffData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/staff/${id}`)
      .then(() => {
        setStaffData(staffData.filter((staff) => staff.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
      });
  };

  // Handle Edit: Pre-fill the form with selected staff data and open modal
  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setUpdatedStaff({ ...staff }); // Pre-fill the form with selected staff data
    setIsModalOpen(true);
  };

  // Handle Update: Send the updated staff data to the server
  const handleUpdate = (values) => {
    axios
      .put(`http://localhost:5000/staff/${selectedStaff.id}`, values)
      .then(() => {
        setStaffData(staffData.map((staff) => 
          staff.id === selectedStaff.id ? values : staff
        ));
        setIsModalOpen(false); // Close modal after successful update
      })
      .catch((error) => {
        console.error('Error updating staff data:', error);
      });
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <div className="table-responsive" style={{ width: '100%' }}>
        <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Phone</th>
              <th style={{ padding: '10px' }}>Role</th>
              <th style={{ padding: '10px' }}>Update</th>
              <th style={{ padding: '10px' }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr key={index} style={{ textAlign: 'left' }}>
                <td style={{ padding: '10px' }}>{staff.name}</td>
                <td style={{ padding: '10px' }}>{staff.email}</td>
                <td style={{ padding: '10px' }}>{staff.phone}</td>
                <td style={{ padding: '10px' }}>{staff.role}</td>
                <td style={{ padding: '10px', cursor: 'pointer' }}>
                  <FaEdit onClick={() => handleEdit(staff)} style={{ color: 'blue' }} />
                </td>
                <td style={{ padding: '10px', cursor: 'pointer' }}>
                  <MdDeleteSweep onClick={() => handleDelete(staff.id)} style={{ color: 'red' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for updating staff data */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="edit-staff-modal"
        aria-describedby="edit-staff-form"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Staff
          </Typography>

          {/* Formik form */}
          <Formik
            initialValues={updatedStaff}
            validationSchema={validationSchema}
            onSubmit={handleUpdate}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="phone"
                  as={TextField}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  name="role"
                  as={TextField}
                  label="Role"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                />

                <Box sx={modalActions}>
                  <Button variant="contained" color="primary" type="submit" className='colourchange' >
                    Update
                  </Button>
                  <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

// Modal styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '400px', // Adjust for better mobile view
  boxSizing: 'border-box',
  boxShadow: 24,
  overflowY: 'auto',
  maxHeight: '80vh', // Allow scrolling if content exceeds height
  '@media (max-width: 600px)': {
    width: '80%',
    maxWidth: '360px',  // Slightly reduce maxWidth for smaller screens
  }
};

// Box for modal actions
const modalActions = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px', // Reduced space for compactness
};

export default Staffdetails;
