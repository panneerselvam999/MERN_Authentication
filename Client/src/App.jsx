import React from "react";
import Signup from "./Component/Signup.jsx";
import Home from "./Component/Home.jsx";
import Login from "./Component/Login.jsx";
import Dashboard from "./Component/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
