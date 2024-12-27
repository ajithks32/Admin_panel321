import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';



const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,  
      "Email must be in lowercase (e.g., xxxxxxx@gmail.com)"
    ),
  role: yup.string().required("Role is required"),
});

function Addstaff() {
  const {register,handleSubmit, reset,formState: { errors },} = useForm({ resolver: yupResolver(schema), });

  const onSubmit = async (data) => {
    try {
    
      const response = await axios.post('http://localhost:5000/staff', data);
      reset();
           
      Swal.fire({
        title: "Data add successfuly",
        icon: "success",
        draggable: true
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div
      className="form"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={20}
        className="formbox"
        style={{
          padding: "20px",
          maxWidth: "400px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ADD STAFF
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
      
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

         
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

         
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              defaultValue=""
              {...register("role")}
            >
              <MenuItem value="Java Fullstack">Java Fullstack</MenuItem>
              <MenuItem value="Python Fullstack">Python Fullstack</MenuItem>
              <MenuItem value="Front End">Front End</MenuItem>
              <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
              <MenuItem value="Data Analytics">Data Analytics</MenuItem>
              <MenuItem value="UI/UX">UI/UX</MenuItem>
            </Select>
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>

          
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: "16px" ,textTransform:"none" }}
            fullWidth
          >
            Add Data
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Addstaff;
