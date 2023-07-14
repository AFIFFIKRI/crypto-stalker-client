import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import Coinpage from "../pages/Coinpage";
import Header from "../components/Header";
import { createUseStyles } from "react-jss";
import Alert from "../components/Alert";
import AuthModal from "../components/authentication/AuthModal";

const useStyles = createUseStyles({
  App: {
    backgroundColor: "#2B2A2B",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage />} exact />
        </Routes>
      </div>

      <Alert />
    </BrowserRouter>
  );
}

export default App;
