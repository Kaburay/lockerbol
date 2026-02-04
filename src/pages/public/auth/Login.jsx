// src/pages/public/auth/Login.jsx
import { styled } from "../../../../styled-system/jsx";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../../../firebase";

import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc
} from "firebase/firestore";

import logo from "../../../assets/logo_lock.svg";
import googleLogo from "../../../assets/google.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();

  // 👉 verifica si existe perfil en Firestore
  const checkProfile = async (uid) => {
    const snap = await getDoc(doc(db, "usuarios", uid));
    return snap.exists();
  };

  const handleContinue = async () => {
    if (loading) return;

    // STEP EMAIL
    if (step === "email") {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !trimmedEmail.includes("@")) {
        alert("Correo inválido");
        return;
      }

      setEmail(trimmedEmail);
      setStep("password");
      return;
    }

    // STEP PASSWORD
    if (step === "password") {
      if (!password) {
        alert("Ingresa tu contraseña");
        return;
      }

      try {
        setLoading(true);

        const cred = await signInWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;

        const hasProfile = await checkProfile(uid);

        if (!hasProfile) {
          navigate("/registro", { state: { email } });
        } else {
          navigate("/dashboard", { replace: true });
        }

      } catch (error) {
        if (error.code === "auth/user-not-found") {
          navigate("/registro", { state: { email } });
        } else if (error.code === "auth/wrong-password") {
          alert("Contraseña incorrecta");
        } else {
          console.error(error);
          alert("Error al iniciar sesión");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const uid = result.user.uid;
      const userEmail = result.user.email?.toLowerCase();

      const hasProfile = await checkProfile(uid);

      if (!hasProfile) {
        navigate("/registro", { state: { email: userEmail } });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (error) {
      console.error(error);
      alert("Error con Google");
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
          <h1>Bienvenido a Lockerbol</h1>
          <p>
            {step === "email"
              ? "Ingresa tu correo para continuar"
              : "Ingresa tu contraseña"}
          </p>
        </Header>

        <Form>
          {step === "email" && (
            <Field>
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Field>
          )}

          {step === "password" && (
            <Field>
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Field>
          )}

          <PrimaryButton onClick={handleContinue} disabled={loading}>
            {step === "email" ? "Continuar" : "Iniciar sesión"}
          </PrimaryButton>

          {step === "email" && (
            <>
              <Divider><span>o</span></Divider>

              <GoogleButton onClick={handleGoogleLogin}>
                <img src={googleLogo} alt="Google" />
                <span>Continuar con Google</span>
              </GoogleButton>
            </>
          )}
        </Form>

        <Footer>
          <span>¿Primera vez en Lockerbol?</span>
          <Link to="/registro">Crear cuenta</Link>
        </Footer>
      </Content>
    </Container>
  );
}

/* ================== STYLES ================== */

const Container = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    display: "flex",
    flexDirection: "column",
  },
});

const TopBar = styled("div", {
  base: { p: "1.5rem" },
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

const Divider = styled("div", {
  base: {
    position: "relative",
    textAlign: "center",
    my: "0.5rem",
    "& span": {
      bg: "background",
      px: "0.75rem",
      fontSize: "0.8rem",
      color: "textSecondary",
    },
    _before: {
      content: '""',
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      h: "1px",
      bg: "border",
      zIndex: -1,
    },
  },
});

const GoogleButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    w: "100%",
    py: "0.85rem",
    borderRadius: "14px",
    border: "1px solid",
    borderColor: "border",
    bg: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(6px)",
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "textPrimary",
    cursor: "pointer",
    "& img": { w: "20px", h: "20px" },
    _hover: { bg: "rgba(255,255,255,0.10)" },
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
