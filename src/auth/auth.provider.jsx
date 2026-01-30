// src/auth/auth.provider.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import AuthContext from "./auth.context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setShowLoginPrompt(false);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const requestAuth = () => {
    setShowLoginPrompt(true);
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
    requestAuth,
    showLoginPrompt,
    setShowLoginPrompt
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
