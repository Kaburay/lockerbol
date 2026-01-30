import { Outlet } from "react-router-dom";
import useAuth from "../auth/auth.store";
import LoginModal from "../components/auth/LoginModal";

export default function SoftAuthGuard() {
  const { user, showLoginPrompt } = useAuth();

  return (
    <>
      <Outlet />
      {!user && showLoginPrompt && <LoginModal />}
    </>
  );
}
