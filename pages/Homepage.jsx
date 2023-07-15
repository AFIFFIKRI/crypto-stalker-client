import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <CoinsTable />
    </div>
  );
};

export default Homepage;
