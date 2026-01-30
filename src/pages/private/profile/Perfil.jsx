// src/pages/private/profile/Perfil.jsx
import { styled } from "../../../../styled-system/jsx";
import { useState, useEffect } from "react";

import useAuth from "../../../auth/auth.store";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

export default function Perfil() {
  const { user, setUser } = useAuth();
  const db = getFirestore();

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // 🔹 Cargar nombre desde Firestore si no está en el estado global
  useEffect(() => {
    if (!user?.email || user?.name) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "usuarios", user.email);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setName(data.name || "");

          setUser((prev) => ({
            ...prev,
            name: data.name || "",
          }));
        }
      } catch (error) {
        console.error("Error cargando datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [db, user?.email, user?.name, setUser]);

  const handleSave = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const userRef = doc(db, "usuarios", user.email);
      await updateDoc(userRef, { name });

      setUser((prev) => ({
        ...prev,
        name,
      }));

      setSuccess("¡Perfil actualizado!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // 🔐 protección extra

  return (
    <Container>
      <Header>
        <h1>Mi perfil</h1>
        <p>Administra tu información personal</p>
      </Header>

      <Form>
        <Field>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </Field>

        <Field>
          <label>Correo electrónico</label>
          <input type="email" value={user.email} disabled />
        </Field>

        <PrimaryButton onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </PrimaryButton>

        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </Container>
  );
}

/* ================= STYLES ================= */

const Container = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: "1.5rem",
    py: "5rem",
  },
});

const Header = styled("div", {
  base: {
    textAlign: "center",
    mb: "2rem",
    "& h1": { color: "textPrimary", fontSize: "1.8rem", fontWeight: 700 },
    "& p": { color: "textSecondary", fontSize: "0.95rem" },
  },
});

const Form = styled("div", {
  base: {
    w: "100%",
    maxW: "480px",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
});

const Field = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    "& label": { fontSize: "0.85rem", fontWeight: 600 },
    "& input": {
      bg: "rgba(255,255,255,0.04)",
      border: "1px solid",
      borderColor: "border",
      borderRadius: "12px",
      px: "1rem",
      py: "0.75rem",
      color: "textPrimary",
      outline: "none",
      _focus: { borderColor: "primary" },
    },
    "& input[disabled]": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

const PrimaryButton = styled("button", {
  base: {
    mt: "0.5rem",
    bg: "primary",
    color: "onPrimary",
    py: "0.85rem",
    borderRadius: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    _hover: { opacity: 0.9 },
  },
});

const SuccessMessage = styled("div", {
  base: {
    mt: "0.5rem",
    color: "green",
    fontWeight: 600,
    fontSize: "0.9rem",
    textAlign: "center",
  },
});
