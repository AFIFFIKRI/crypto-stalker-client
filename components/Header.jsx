import {
  Select,
  MenuItem,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../src/CryptoContext";
import Cookies from "js-cookie";
import { HOST } from "../src/config/api";
import AuthModal from "./authentication/AuthModal";
import UserSideBar from "./authentication/UserSideBar";
import axios from "axios";



const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  console.log(currency);

  const jwt = Cookies.get("token");
  const [user, setUser] = useState(null);

  const fetchUserAccount = async () => {
    // get jwt from localStorage

    console.log(jwt);

    await axios
      .get(`${HOST}/private`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data);
        setUser(response.data.user);
        // setAdmin(response.data.user.isAdmin);
      })
      .catch(function (error) {
        // handle error
        console.error(error);
        // handleNavigateToLogin();
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "5rem",
          padding: "1rem",
          borderBottom: "2px solid grey",
        }}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Crypto stalker
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Select
            variant="outlined"
            style={{ width: "100px", height: "40px" }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"MYR"}>MYR</MenuItem>
          </Select>

          {/* <AuthModal />

          <UserSideBar /> */}

          {user ? <UserSideBar /> : <AuthModal />}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Header;
