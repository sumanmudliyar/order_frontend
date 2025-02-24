import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import OrderLocation from "./pages/Map/Map";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/map" element={<OrderLocation />} />
      </Routes>
    </Router>
  );
};

export default App;
