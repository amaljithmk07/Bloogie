import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/User/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./components/User/BlogPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
