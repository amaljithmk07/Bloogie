import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/User/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./components/User/BlogPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import EditBlog from "./components/User/EditBlog";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog-edit" element={<EditBlog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
