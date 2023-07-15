import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { CryptoState } from "../../src/CryptoContext";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async (event) => {
    if (password !== confirmPassword) {
      setAlert({ open: true, message: "Incorrect passwords", type: "error" });
      return;
    }

    // Send credentials to db

    try {
      event.preventDefault();
      const formObject = { email, username, password, confirmPassword };
      console.log({email, username, password, confirmPassword});

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome `,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "black",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
      ></TextField>

      <TextField
        variant="outlined"
        type="username"
        label="Enter Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        fullWidth
      ></TextField>

      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
      ></TextField>

      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        fullWidth
      ></TextField>

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#A527BF", fontWeight: "bold" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
