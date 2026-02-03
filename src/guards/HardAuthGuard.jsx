// src/guards/HardAuthGuard.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/auth.store";

export default function HardAuthGuard() {
  const user = useAuth((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
