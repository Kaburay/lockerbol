// src/guards/SoftAuthGuard.jsx
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../auth/auth.store";

export default function SoftAuthGuard() {
  const user = useAuth((state) => state.user);

  return (
    <>
      {user ? <Navigate to="/dashboard" replace /> : <Outlet />}
    </>
  );
}
