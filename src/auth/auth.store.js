// src/auth/auth.store.js
import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const useAuth = create((set) => ({
  user: null,          // usuario FINAL con perfil
  firebaseUser: null,  // usuario auth puro
  loading: true,

  logout: async () => {
    await signOut(auth);
    set({ user: null, firebaseUser: null });
  },
}));

// 🔥 Listener global (UNA sola vez en toda la app)
onAuthStateChanged(auth, async (firebaseUser) => {
  // 🔄 Reset base
  if (!firebaseUser) {
    useAuth.setState({
      firebaseUser: null,
      user: null,
      loading: false,
    });
    return;
  }

  // Auth existe
  useAuth.setState({
    firebaseUser,
    loading: true,
  });

  try {
    const ref = doc(db, "usuarios", firebaseUser.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // ⚠️ Auth OK pero perfil NO creado
      useAuth.setState({
        user: null,
        loading: false,
      });
      return;
    }

    // ✅ Perfil completo
    useAuth.setState({
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...snap.data(),
      },
      loading: false,
    });
  } catch (err) {
    console.error("Auth load error:", err);
    useAuth.setState({
      user: null,
      loading: false,
    });
  }
});

export default useAuth;
