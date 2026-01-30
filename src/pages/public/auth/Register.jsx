// src/pages/public/auth/Register.jsx
import { styled } from "../../../../styled-system/jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import logo from "../../../assets/logo_lock.svg";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const db = getFirestore();

  const email = location.state?.email || "";

  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  if (loading) return;

  if (!username || !nombre || !telefono || !fechaNacimiento || !password) {
    alert("Completa todos los campos");
    return;
  }

  try {
    setLoading(true);

    let user = auth.currentUser;

    // 👉 Si NO existe sesión (registro normal)
    if (!user) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      user = cred.user;
    }

    const uid = user.uid;

    // 👉 Crear documento Firestore SIEMPRE
    await setDoc(doc(db, "usuarios", uid), {
      correo: email.toLowerCase(),
      username,
      nombre_completo: nombre,
      telefono,
      tipo_usuario: "usuario",
      fecha_nacimiento: fechaNacimiento,
      fecha_creacion: serverTimestamp(),
      version_perfil: 1,
    });

    navigate("/");
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <TopBar>
        <LogoLink to="/">
          <img src={logo} alt="Lockerbol" />
        </LogoLink>
      </TopBar>

      <Content>
        <Header>
          <h1>Crear cuenta</h1>
          <p>Completa tu información para registrarte</p>
        </Header>

        <Form>
          <Field>
            <label>Correo</label>
            <input type="email" value={email}/>
          </Field>

          <Field>
            <label>Usuario</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Field>

          <Field>
            <label>Nombre completo</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Field>

          <Field>
            <label>Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </Field>

          <Field>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </Field>

          <Field>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <PrimaryButton onClick={handleRegister} disabled={loading}>
            Crear cuenta
          </PrimaryButton>
        </Form>

        <Footer>
          <span>¿Ya tienes cuenta?</span>
          <Link to="/login">Iniciar sesión</Link>
        </Footer>
      </Content>
    </Container>
  );
}

/* ================= STYLES (copiados del login) ================= */

const Container = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    display: "flex",
    flexDirection: "column",
  },
});

const TopBar = styled("div", {
  base: {
    p: "1.5rem",
  },
});

const LogoLink = styled(Link, {
  base: {
    display: "inline-flex",
    alignItems: "center",
    "& img": { h: "40px" },
  },
});

const Content = styled("div", {
  base: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    px: "1.5rem",
  },
});

const Header = styled("div", {
  base: {
    textAlign: "center",
    mb: "2rem",
    maxW: "380px",
    "& h1": {
      color: "textPrimary",
      fontSize: "1.9rem",
      fontWeight: 800,
      mb: "0.5rem",
    },
    "& p": {
      color: "textSecondary",
      fontSize: "0.95rem",
    },
  },
});

const Form = styled("div", {
  base: {
    w: "100%",
    maxW: "380px",
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
    "& label": {
      fontSize: "0.85rem",
      fontWeight: 600,
      color: "textPrimary",
    },
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
    _hover: { opacity: 0.9 },
  },
});

const Footer = styled("div", {
  base: {
    mt: "2rem",
    textAlign: "center",
    fontSize: "0.9rem",
    color: "textSecondary",
    "& a": {
      ml: "0.4rem",
      color: "primary",
      fontWeight: 600,
    },
  },
});
