import React, { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../use-auth";

export default function Login() {
  const { logIn } = useAuth();
  const [successRedirect, setSuccessRedirect] = useState(false);
  const { state } = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, password } = event.target;
    try {
      const response = await logIn(userName.value, password.value);
      setSuccessRedirect(true);
    } catch (err) {}
  };

  if (successRedirect) return <Redirect to={state?.from || "/profile"} />;

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            name="userName"
            fullWidth
            label="userName"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box>
          <TextField
            name="password"
            type="password"
            fullWidth
            label="password"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <Box>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
        <Link to="/register">Don't have account?</Link>
      </form>
    </Container>
  );
}
