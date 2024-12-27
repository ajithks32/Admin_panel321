import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; // Import edit icon
import { MdDeleteSweep } from "react-icons/md"; // Import delete icon
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme for responsive styles
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik and Form components
import * as Yup from "yup"; // Import Yup for validation
import "./details.css";
import "./formalignment.css";

// Yup validation schema with custom validation for phone and email
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-z0-9._%+-]+@gmail\.com$/,
      "Email must be in lowercase and end with @gmail.com"
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  batch: Yup.string().required("Batch is required"),
  course: Yup.string().required("Course is required"),
});

const Studentdetails = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // To track the student being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [updatedStudent, setUpdatedStudent] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    batch: "",
    course: "",
  });

  const theme = useTheme(); // Hook for accessing the theme

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting student data:", error);
      });
  };

  // Handle Edit: Pre-fill the form with selected student data and open modal
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setUpdatedStudent({ ...student }); // Pre-fill the form with selected student data
    setIsModalOpen(true);
  };

  // Handle Update: Send the updated student data to the server
  const handleUpdate = (values) => {
    axios
      .put(`http://localhost:5000/students/${selectedStudent.id}`, values)
      .then((response) => {
        setStudents(
          students.map((student) =>
            student.id === selectedStudent.id ? values : student
          )
        );
        setIsModalOpen(false); // Close modal after successful update
      })
      .catch((error) => {
        console.error("Error updating student data:", error);
      });
  };

  const courses = [
    "Computer Science",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical Engineering",
  ]; // List of courses

  return (
    <div
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
      <div className="table-responsive" style={{ width: "100%" }}>
        <table
          className="table"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Phone</th>
              <th style={{ padding: "10px" }}>Gender</th>
              <th style={{ padding: "10px" }}>Age</th>
              <th style={{ padding: "10px" }}>Batch</th>
              <th style={{ padding: "10px" }}>Course</th>
              <th style={{ padding: "10px" }}>Update</th>
              <th style={{ padding: "10px" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} style={{ textAlign: "left" }}>
                <td style={{ padding: "10px" }}>{student.name}</td>
                <td style={{ padding: "10px" }}>{student.email}</td>
                <td style={{ padding: "10px" }}>{student.phone}</td>
                <td style={{ padding: "10px" }}>{student.gender}</td>
                <td style={{ padding: "10px" }}>{student.age}</td>
                <td style={{ padding: "10px" }}>{student.batch}</td>
                <td style={{ padding: "10px" }}>{student.course}</td>
                <td style={{ padding: "10px", cursor: "pointer" }}>
                  <FaEdit
                    onClick={() => handleEdit(student)}
                    style={{ color: "blue" }}
                  />
                </td>
                <td style={{ padding: "10px", cursor: "pointer" }}>
                  <MdDeleteSweep
                    onClick={() => handleDelete(student.id)}
                    style={{ color: "red" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for updating student data */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="edit-student-modal"
        aria-describedby="edit-student-form"
      >
        <Box sx={modalStyle}>
          {/* Formik form */}
          <Formik
            initialValues={updatedStudent}
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
                  className="formalignment"
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
                  className="formalignment"
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
                  className="formalignment"
                  fullWidth
                  margin="normal"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <Field
                  name="gender"
                  as={TextField}
                  label="Gender"
                  variant="outlined"
                  className="formalignment"
                  fullWidth
                  margin="normal"
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                />
                <Field
                  name="age"
                  as={TextField}
                  label="Age"
                  variant="outlined"
                  className="formalignment"
                  fullWidth
                  margin="normal"
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
                <Field
                  name="batch"
                  as={TextField}
                  label="Batch"
                  variant="outlined"
                  className="formalignment"
                  fullWidth
                  margin="normal"
                  error={touched.batch && Boolean(errors.batch)}
                  helperText={touched.batch && errors.batch}
                />

                {/* Course dropdown */}
                {/* Course dropdown */}
                <FormControl
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className="formalignment"
                >
                  <InputLabel>Course</InputLabel>
                  <Field
                    name="course"
                    as={Select}
                    label="Course"
                    error={touched.course && Boolean(errors.course)}
                  >
                    {courses.map((course, index) => (
                      <MenuItem key={index} value={course}>
                        {course}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.course && errors.course && (
                    <Typography color="error" variant="body2">
                      {errors.course}
                    </Typography>
                  )}
                </FormControl>

                <Box sx={modalActions}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="colourchange"
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsModalOpen(false)}
                  >
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px", // Adjust for better mobile view
  boxSizing: "border-box",
  boxShadow: 24,
  overflowY: "auto",
  maxHeight: "80vh", // Allow scrolling if content exceeds height
  "@media (max-width: 600px)": {
    width: "80%",
    maxWidth: "360px", // Slightly reduce maxWidth for smaller screens
  },
};

// Box for modal actions
const modalActions = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px", // Reduced space for compactness
};

export default Studentdetails;
