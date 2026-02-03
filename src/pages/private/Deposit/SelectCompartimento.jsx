// src/pages/private/Deposit/SelectCompartimento.jsx

import { useEffect, useState } from "react";
import { styled } from "../../../../styled-system/jsx";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import Stepper from "../../../components/ui/Stepper";
import LockerRenderer from "../../../components/ui/LockerRenderer";

// --------------------
// Styled components
// --------------------

const Container = styled("div", {
  base: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

const Title = styled("h1", {
  base: {
    fontSize: "18px",
    fontWeight: "600",
    color: "textPrimary",
  },
});

const LockerWrapper = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "8px",
  },
});

const Center = styled("div", {
  base: {
    paddingY: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    color: "textSecondary",
    textAlign: "center",
  },
});

const DetailsCard = styled("div", {
  base: {
    padding: "16px",
    borderRadius: "24px",
    background: "surface",
    marginTop: "8px",
    color: "textPrimary",
  },
});

const DetailsTitle = styled("h2", {
  base: {
    fontSize: "16px",
    fontWeight: "600",
    color: "textPrimary",
    marginBottom: "8px",
  },
});

const Button = styled("button", {
  base: {
    marginTop: "12px",
    padding: "14px",
    borderRadius: "24px",
    background: "primary",
    color: "onPrimary",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
    _hover: {
      opacity: 0.9,
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

// --------------------
// Component
// --------------------

export default function SelectCompartimento() {
  const navigate = useNavigate();
  const location = useLocation();

  const { lockerId, lockerNombre, columnas } = location.state || {};

  const [compartimentos, setCompartimentos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lockerId) return;

    setLoading(true);
    setError(null);

    const ref = collection(db, "compartimentos");

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((c) => c.locker_id === lockerId);

        setCompartimentos(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("No se pudo cargar la información del locker.");
        setLoading(false);
      }
    );

    return unsub;
  }, [lockerId]);

  const disponibles = compartimentos.filter((c) => c.disponible).length;

  // --------------------
  // Guard mínimo (web)
  // --------------------

  if (!lockerId) {
    return (
      <Container>
        <Center>Información del locker no disponible.</Center>
      </Container>
    );
  }

  return (
    <Container>
      {/* Stepper siempre visible */}
      <Stepper currentStep={2} totalSteps={3} />

      <Title>{lockerNombre}</Title>

      {/* Área del locker */}
      <LockerWrapper>
        {loading && (
          <Center>
            <span>Cargando compartimentos…</span>
          </Center>
        )}

        {!loading && error && (
          <Center>
            <strong>{error}</strong>
            <span>Verifica tu conexión e inténtalo nuevamente.</span>
          </Center>
        )}

        {!loading && !error && (
          <LockerRenderer
            columnas={columnas}
            compartimentos={compartimentos}
            onSelect={setSelected}
          />
        )}
      </LockerWrapper>

      {/* Sin disponibles */}
      {!loading && !error && disponibles === 0 && (
        <DetailsCard>
          <strong style={{ color: "var(--colors-textPrimary)" }}>
            No hay compartimentos disponibles
          </strong>
          <p style={{ color: "var(--colors-textSecondary)", marginTop: "6px" }}>
            Intenta con otro locker o vuelve más tarde.
          </p>
        </DetailsCard>
      )}

      {/* Detalles del seleccionado */}
      {selected && (
        <DetailsCard>
          <DetailsTitle>Compartimento C{selected.numero}</DetailsTitle>

          <p style={{ color: "textPrimary" }}>
            Estado: {selected.disponible ? "Disponible" : "Ocupado"}
          </p>

          <p style={{ color: "textPrimary" }}>
            Dimensiones: {selected.dimensiones}
          </p>

          {selected.disponible && (
            <Button
              onClick={() =>
                navigate("/depositar/detalles", {
                  state: {
                    lockerId,
                    compartimento: selected,
                  },
                })
              }
            >
              Continuar
            </Button>
          )}
        </DetailsCard>
      )}
    </Container>
  );
}
