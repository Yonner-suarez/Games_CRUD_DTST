import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import CreateGame from "./components/CreateGame/CreateGame";
import UpdateGame from "./components/UpdateGame/UpdateGame";
function App() {
  const location = useLocation();
  const [showLoading, setShowLoading] = useState({ display: "none" });

  async function getToken() {
    setShowLoading({ display: "none" });
  }

  useEffect(() => {
    setShowLoading({ display: "block" });
    getToken();
  }, []);

  return (
    <>
      <Loader
        estilo={showLoading}
        show={showLoading.display === "block" ? true : false}
      ></Loader>
      <Navbar />
      <Routes key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/Games/create"
          element={<CreateGame />}
        />
        <Route
          path="/Games/update/:id"
          element={<UpdateGame />}
        />
        <Route
          path="/Games/products"
          element={<Games />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
