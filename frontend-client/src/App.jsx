import { Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogForm from "./components/BlogForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/blog/:id"
          element={
            <>
              <ProtectedRoute>
                <Navbar /> <BlogDetail /> <Footer />
              </ProtectedRoute>
            </>
          }
        />

        <Route path="/blogs/new" element={<CreateBlogPage />} />
        <Route path="/blogs/:id/edit" element={<EditBlogPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <BlogForm/> */}
    </>
  );
}

export default App;
