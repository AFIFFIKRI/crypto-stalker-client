import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "./config/api";
import Cookies from "js-cookie";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("MYR");
  const [symbol, setSymbol] = useState("RM");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
   // const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  // const [watchlist, setWatchlist] = useState([]);

  // postgress check watchlist
  // useEffect(() => {
  //   if (user) {
  //     const coinRef = doc(db, "watchlist", user?.uid);
  //     let unsubscribe = onSnapshot(coinRef, (coin) => {
  //       if (coin.exists()) {
  //         console.log(coin.data().coins);
  //         setWatchlist(coin.data().coins);
  //       } else {
  //         console.log("No Items in Watchlist");
  //       }
  //     });

  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [user]);

  // user page need modify to pstgres needs

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) setUser(user);
  //     else setUser(null);
  //   });
  // }, []);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "MYR") setSymbol("RM");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        // user,
        // setUser,
        // watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
