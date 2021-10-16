import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Register() {
  const formRef = useRef(null);

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
      document.getElementById("register-form").reset();
    } catch (err) {}
  };

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
      </form>
    </Container>
  );
}
