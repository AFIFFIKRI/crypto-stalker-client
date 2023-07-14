import React from "react";
import Carousel from "./Carousel";
import { createUseStyles } from "react-jss";
import { Container } from "@mui/material";

const useStyles = createUseStyles({
  banner: {
    backgroundImage: "url(./banner-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
});

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <div className={classes.bannerContent}>
        <div className={classes.tagline}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "70px",
              color: "#A527BF",
              marginBottom: 15,
              textTransform: "capitalize",
            }}
          >
            crypto stalker
          </h1>
          <p
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
            }}
          >
            Get all the info regarding your favourite Crypto Currency
          </p>
        </div>
        <Carousel />
      </div>
    </div>
  );
};

export default Banner;
