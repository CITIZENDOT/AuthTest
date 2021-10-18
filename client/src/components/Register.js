import React, { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Register() {
  const formRef = useRef(null);
  const [successRedirect, setSuccessRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, userName, password } = event.target;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/register`,
        {
          firstName: firstName.value,
          lastName: lastName.value,
          userName: userName.value,
          password: password.value,
        }
      );
      setSuccessRedirect(true);
      document.getElementById("register-form").reset();
    } catch (err) {}
  };

  if (successRedirect) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            severity: "info",
            message: "Your account has been created. You may now login.",
          },
        }}
      />
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <h1>Register</h1>
      <form onSubmit={handleSubmit} ref={formRef} id="register-form">
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <TextField
              name="firstName"
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextField
              name="lastName"
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Box>
          <TextField
            name="userName"
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            name="password"
            type="password"
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box>
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
        <Link to="/login">Already Have an account?</Link>
      </form>
    </Container>
  );
}
