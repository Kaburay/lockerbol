// src/guards/SoftAuthGuard.jsx
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../auth/auth.store";

export default function SoftAuthGuard() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
