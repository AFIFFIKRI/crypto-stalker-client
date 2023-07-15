import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../src/CryptoContext";
import { SingleCoin } from "../src/config/api";
import { createUseStyles } from "react-jss";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/banner/Carousel";
import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { HOST } from "../src/config/api";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const jwt = Cookies.get("token");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const { currency, symbol, setAlert } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);

  const fetchUserAccount = async () => {
    await axios
      .get(`${HOST}/private`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        // handle success
        console.info(response.data.user);
        setUser(response.data.user);
        setWatchlist(response.data.user.watchlist);
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
    fetchCoins();
    fetchUserAccount();
  }, []);

  const useStyles = createUseStyles({
    container: {
      display: "flex",
      "@media (max-width: 900px)": {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      "@media (max-width: 900px)": {
        width: "100%",
      },

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

      // responsive design
      "@media (max-width: 900px)": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      "@media (max-width: 600px)": {
        flexDirection: "column",
        alignItems: "center",
      },
      "@media (max-width: 0px)": {
        alignItems: "start",
      },
    },
  });

  const classes = useStyles();

  // need configuration for db postgres
  // const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    // const coinRef = doc(db, "watchlist", user.uid);
    try {
      if (coin && user) {
        const updatedWatchlist = [...watchlist, coin?.id];
        await axios.post(
          `${HOST}/api/users/watchlist/add`,
          { watchlist: updatedWatchlist },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        setWatchlist(updatedWatchlist);
      }
      // await setDoc(
      //   coinRef,
      //   { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
      //   { merge: true }
      // );

      setAlert({
        open: true,
        message: `${coin?.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    // const coinRef = doc(db, "watchlist", user.uid);
    try {
      if (coin && user) {
        const updatedWatchlist = watchlist.filter((itemId) => itemId !== coin?.id);
        await axios.post(
          `${HOST}/api/users/watchlist/remove`,
          { watchlist: updatedWatchlist  },
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        setWatchlist(updatedWatchlist);
      }
      // await setDoc(
      //   coinRef,
      //   { coins: watchlist.filter((wish) => wish !== coin?.id) },
      //   { merge: true }
      // );

      setAlert({
        open: true,
        message: `${coin?.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  console.log(coin);

  // const fetchWatchlist = async () => {
  //   // const coinRef = doc(db, "watchlist", user.uid);
  //   try {
  //     if (jwt) {
  //       await axios.post(`${HOST}/api/users/watchlist`, {
  //         watchlist: coin,
  //       });
  //       setWatchlist(response.data);
  //     }
  //   } catch (error) {
  //     setAlert({
  //       open: true,
  //       message: error.message,
  //       type: "error",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   fetchWatchlist();
  // }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "orangered" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <h1 className={classes.heading}>{coin?.name}</h1>
        <p className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </p>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <h2 className={classes.heading}>Rank:</h2>
            &nbsp; &nbsp;
            <h2>{coin?.market_cap_rank}</h2>
          </span>

          <span style={{ display: "flex" }}>
            <h2 className={classes.heading}>Current Price:</h2>
            &nbsp; &nbsp;
            <h2>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </h2>
          </span>

          <span style={{ display: "flex" }}>
            <h2 className={classes.heading}>Market Cap:</h2>
            &nbsp; &nbsp;
            <h2>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </h2>
          </span>

          {/* once configure user db use this line */}
          {/* {user && (
            <Button
              variant="outlined"
              style={{ 
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? '#ff0000' : "#EEBC1D" 
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
            >{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</Button>
          )} */}

          {user && (
            <div>
              {watchlist && watchlist.includes(coin) ? (
                <Button
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#ff0000",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={removeFromWatchlist}
                >
                  Remove from Watchlist
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#EEBC1D",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={addToWatchlist}
                >
                  Add to Watchlist
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
