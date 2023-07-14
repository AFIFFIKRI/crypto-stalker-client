import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Banner from "../components/banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div style={{  }}>
      {/* <Header /> */}

      <Banner/>

      <CoinsTable />


    </div>
  );
};

export default Homepage;
