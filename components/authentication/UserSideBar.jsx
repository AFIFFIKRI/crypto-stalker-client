import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { CryptoState } from "../../src/CryptoContext";
import { createUseStyles } from "react-jss";
import { AiFillDelete } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import { HOST } from "../../src/config/api";

const UserSideBar = () => {
  const jwt = Cookies.get("token");
  const [user, setUser] = useState(null);
  const { setAlert, watchlist, coins } = CryptoState();

  const handleRefresh = () => {
    window.location.reload();
  };

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
        handleRefresh();
      })
      .finally(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchUserAccount();
  }, [jwt]);

  // logout function
  const handleLogout = () => {
    Cookies.remove("token");
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful !",
    });
    toggleDrawer();
    // handleRefresh();
  };

  // drawer toggler
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const useStyles = createUseStyles({
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
      border: "2px solid grey",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      backgroundColor: "#A527BF",
      color: "#fff",
      objectFit: "contain",
    },

    logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#A527BF",
      marginTop: 20,
      borderRadius: "10px",
    },
    watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
    coin: {
      padding: 10,
      borderRadius: 5,
      color: "black",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#EEBC1D",
      boxShadow: "0 0 3px black",
    },
  });

  const classes = useStyles();

  // const removeFromWatchlist = async (coin) => {
  //   const coinRef = doc(db, "watchlist", user.uid);
  //   try {
  //     await setDoc(
  //       coinRef,
  //       { coins: watchlist.filter((wish) => wish !== coin?.id) },
  //       { merge: true }
  //     );

  //     setAlert({
  //       open: true,
  //       message: `${coin.name} Removed from the Watchlist !`,
  //       type: "success",
  //     });
  //   } catch (error) {
  //     setAlert({
  //       open: true,
  //       message: error.message,
  //       type: "error",
  //     });
  //   }
  // };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 40,
              width: 40,
              marginLeft: 15,
              cursor: "pointer",
              color: "#fff",
              backgroundColor: "#A527BF",
            }}
            // src={user.photoURL}
            // alt={user?.username || user?.email}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  // src={user.photoURL}
                  // alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user?.username || "no data"}
                </span>
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user?.email || "no data"}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>

                  {/* {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })} */}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSideBar;
