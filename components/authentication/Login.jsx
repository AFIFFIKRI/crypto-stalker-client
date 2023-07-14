import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { CryptoState } from "../../src/CryptoContext";
import axios from "axios";
import { HOST } from "../../src/config/api";
import useLocalStorage from "../../src/hook/useLocalStorage";
import Cookies from "js-cookie";

const Login = ({ handleClose }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useState("");

  // const [jwt, setJwt] = useLocalStorage("token", "");
  // const navigate = useNavigate();
  // const handleSucesssNavigation = () => {
  //   navigate("/");
  // };
  const handleRefresh = () => {
    window.location.reload();
  };

  const { setAlert, setLoading } = CryptoState();

  const handleSubmit = async (event) => {
    if (!identifier || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
    }

    event.preventDefault();

    // send formObject to api
    // setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched

    await axios
      .post(`${HOST}/api/login`, {
        identifier,
        password,
      })
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        // const  jwt  = response.data.jwt;
        const { jwt } = response.data;
        Cookies.set("token", jwt);
        setJwt(jwt);
        setAlert({
          open: true,
          message: `Login Successful. Welcome ${identifier}`,
          type: "success",
        });
        handleClose();
        // handleSucesssNavigation();
        handleRefresh();
      })
      .catch(function (error) {
        // console.error(error.response.data);
        setAlert({
          open: true,
          message: "Invalid Credential",
          type: "error",
        });
        return;
      })
      .finally(function () {});

    // try {
    //   const response = await axios.post(`${HOST}/api/login`, {
    //     identifier,
    //     password,
    //   });

    //   if (response && response.data) {
    //     console.log(response.data);
    //     const { jwt } = response.data.jwt;
    //     Cookies.set("token", jwt);
    //     setAlert({
    //       open: true,
    //       message: `Login Successful. Welcome ${identifier}`,
    //       // ${result.user.email}`
    //       type: "success",
    //     });
    //     handleClose();
    //   }
    // } catch (error) {
    //   setAlert({
    //     open: true,
    //     message: "Invalid Credential",
    //     type: "error",
    //   });
    //   return;
    // }
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
        type="identifier"
        label="Enter Email / Username"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
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

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#A527BF", fontWeight: "bold" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
