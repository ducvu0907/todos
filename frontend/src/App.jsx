import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={authUser ? <Navigate to="/" /> : <SignIn />} />
      <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  )
}