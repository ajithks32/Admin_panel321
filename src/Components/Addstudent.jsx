import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography as MuiTypography,
} from "@mui/material";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9-]+\.[a-z0-9-.]+$/,
      "Email must be in lowercase and follow the correct format,xxxxx@gmail.com "
    ),
  course: yup.string().required("Course is required"),
  batch: yup
    .number()
    .required("Batch year is required")
    .min(2000, "Year must be after 2000")
    .max(new Date().getFullYear(), "Year can't be in the future"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "Age must be at least 18"),
  gender: yup.string().required("Gender is required"),
});

function Addstudent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/students", data);
      reset();

      Swal.fire({
        title: "Data add successfuly",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
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
      }}
    >
      <Paper
        elevation={10}
        className="formbox"
        style={{
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ADD STUDENTS
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
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

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  {...register("gender")}
                  defaultValue=""
                  error={!!errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <MuiTypography color="error" variant="caption">
                    {errors.gender.message}
                  </MuiTypography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                variant="outlined"
                type="number"
                fullWidth
                {...register("age")}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </Grid>
          </Grid>

          <TextField
            label="Batch Year"
            variant="outlined"
            type="number"
            fullWidth
            {...register("batch")}
            error={!!errors.batch}
            helperText={errors.batch?.message}
          />

          <FormControl fullWidth>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              {...register("course")}
              defaultValue=""
              error={!!errors.course}
            >
              <MenuItem value="Java Fullstack">Java Fullstack</MenuItem>
              <MenuItem value="Python Fullstack">Python Fullstack</MenuItem>
              <MenuItem value="Front End">Front End</MenuItem>
              <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
              <MenuItem value="Data Analytics">Data Analytics</MenuItem>
              <MenuItem value="UI/UX">UI/UX</MenuItem>
            </Select>
            {errors.course && (
              <MuiTypography color="error" variant="caption">
                {errors.course.message}
              </MuiTypography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: "12px", textTransform: "none" }}
            fullWidth
          >
            Add Data
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Addstudent;
