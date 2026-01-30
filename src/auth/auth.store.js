// src/auth/auth.store.js
import { create } from "zustand";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const useAuth = create((set) => ({
  user: null,
  loading: true,

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

// 🔥 Escucha global de Firebase Auth
onAuthStateChanged(auth, async (firebaseUser) => {
  if (!firebaseUser) {
    useAuth.setState({ user: null, loading: false });
    return;
  }

  try {
    const ref = doc(db, "usuarios", firebaseUser.uid);
    const snap = await getDoc(ref);

    // Si existe el documento, usamos los datos
    if (snap.exists()) {
      const data = snap.data();
      useAuth.setState({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: data.nombre_completo || "Usuario",
          ...data,
        },
        loading: false,
      });
    } else {
      // Documento no existe todavía → fallback defensivo
      // Esto pasa justo después de un registro con Google
      useAuth.setState({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: "Usuario",
        },
        loading: false,
      });
    }
  } catch (error) {
    console.error("Error cargando usuario:", error);
    useAuth.setState({
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: "Usuario",
      },
      loading: false,
    });
  }
});

export default useAuth;
