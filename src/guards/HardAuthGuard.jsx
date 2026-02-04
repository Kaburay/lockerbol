// src/guards/HardAuthGuard.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/auth.store";

export default function HardAuthGuard() {
  const { user, loading } = useAuth();

  if (loading) return null; // o spinner

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
