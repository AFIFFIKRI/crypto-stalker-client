import React from "react";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { createUseStyles } from "react-jss";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = createUseStyles({
    selectbutton: {
      border: "1px solid #A527BF",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#A527BF" : "",
      color: selected ? "#fff" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#A527BF",
        color: "#fff",
      },
      width: "22%",
      margin: 5,
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
