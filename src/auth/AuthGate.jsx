// src/auth/AuthGate.jsx
import useAuth from "./auth.store";
import SplashScreen from "../components/layout/SplashScreen";

export default function AuthGate({ children }) {
  const loading = useAuth((state) => state.loading);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
}
