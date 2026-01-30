import useAuth from "../../auth/auth.store";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase"; // tu Firebase web client

export default function LoginModal() {
  const { setUser, hideLoginPrompt } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      hideLoginPrompt();
    } catch (error) {
      console.error("Error login Google:", error);
    }
  };

  return (
    <div className="login-modal">
      <h2>Inicia sesión</h2>
      <button onClick={handleGoogleLogin}>Continuar con Google</button>
    </div>
  );
}
