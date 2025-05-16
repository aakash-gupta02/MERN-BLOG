import { Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import BlogDetail from "./pages/BlogDetail";
// import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
// import Navbar from "./components/NavBar";

import ProtectedRoute from "./components/ProtectedRoute";
import BlogForm from "./components/BlogForm";
import DashboardLayout from "./components/DashboardLayout";
import ProfileSection from "./pages/ProfileSection";
import BlogDashboard from "./pages/BlogDashboard";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
       <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    
   
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

        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/myblogs" element={ <BlogDashboard/>} />



        <Route path="*" element={<NotFoundPage />} />
      </Routes>



    </>
  );
}

export default App;
