import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Fade, AppBar, Tab, Tabs } from "@mui/material";
import Modal from "@mui/material/Modal";
import { createUseStyles } from "react-jss";
import Login from "./Login";
import SignUp from "./SignUp";


// Creating modal for login and signup function

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(value);

  const useStyles = createUseStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      color: "white",
      borderRadius: 10,
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#A527BF",
          color: "#fff",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
