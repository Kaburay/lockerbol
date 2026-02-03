// src/pages/private/Deposit/SelectLocker.jsx
import { useEffect, useState } from "react";
import { styled } from "../../../../styled-system/jsx";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import Stepper from "../../../components/ui/Stepper";

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

const Grid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "12px",
    paddingBottom: "80px",
  },
});

const Card = styled("button", {
  base: {
    position: "relative",
    height: "160px",
    borderRadius: "24px",
    background: "surface",
    border: "1px solid",
    borderColor: "border",
    textAlign: "left",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "lg",
    },
  },
});

const Content = styled("div", {
  base: {
    padding: "16px",
    maxWidth: "70%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    zIndex: 2,
  },
});

const CardTitle = styled("h2", {
  base: {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: "600",
    color: "textPrimary",
  },
});

const Badges = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
});

const Badge = styled("span", {
  base: {
    alignSelf: "flex-start",
    background: "rgba(190,190,190,0.2)",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    color: "textSecondary",
  },
});

const ImageWrapper = styled("div", {
  base: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    pointerEvents: "none",
  },
});

const LockerImage = styled("img", {
  base: {
    width: "100%",
    opacity: 0.9,
  },
});

const Center = styled("div", {
  base: {
    flex: 1,
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    color: "textSecondary",
    textAlign: "center",
  },
});

// --------------------
// Component
// --------------------

export default function SelectLocker() {
  const navigate = useNavigate();

  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [disponiblesMap, setDisponiblesMap] = useState({});

  useEffect(() => {
    const ref = collection(db, "lockers");

    const unsub = onSnapshot(
      ref,
      async (snap) => {
        try {
          const data = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((l) => l.activo);

          setLockers(data);

          const map = {};

          for (const locker of data) {
            const q = query(
              collection(db, "compartimentos"),
              where("locker_id", "==", locker.id),
              where("disponible", "==", true)
            );

            const snapCompartimentos = await getDocs(q);
            map[locker.id] = snapCompartimentos.size;
          }

          setDisponiblesMap(map);
          setError(null);
        } catch (e) {
          console.error(e);
          setError("No se pudo cargar la información.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Error de conexión.");
        setLoading(false);
      }
    );

    return unsub;
  }, []);

  // --------------------
  // Estados
  // --------------------

  if (loading) {
    return (
      <Container>
        <Stepper currentStep={1} totalSteps={3} />
        <Center>Cargando lockers…</Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Stepper currentStep={1} totalSteps={3} />
        <Center>
          <strong>{error}</strong>
          <span>Verifica tu conexión e inténtalo nuevamente.</span>
        </Center>
      </Container>
    );
  }

  if (lockers.length === 0) {
    return (
      <Container>
        <Stepper currentStep={1} totalSteps={3} />
        <Center>
          <strong>No hay lockers disponibles</strong>
          <span>Intenta más tarde o revisa otra ubicación.</span>
        </Center>
      </Container>
    );
  }

  // --------------------
  // Render
  // --------------------

  return (
    <Container>
      <Stepper currentStep={1} totalSteps={3} />

      <Title>Selecciona tu locker</Title>

      <Grid>
        {lockers.map((locker) => {
          const disponibles = disponiblesMap[locker.id] ?? 0;

          return (
            <Card
              key={locker.id}
              onClick={() =>
                navigate("/depositar/compartimento", {
                  state: {
                    lockerId: locker.id,
                    lockerNombre: locker.nombre,
                    columnas: locker.columnas,
                  },
                })
              }
            >
              <Content>
                <CardTitle>{locker.nombre}</CardTitle>

                <Badges>
                  <Badge>{locker.ubicacion_corta}</Badge>
                  <Badge>
                    {disponibles} de {locker.total_compartimentos} disponibles
                  </Badge>
                </Badges>
              </Content>

              <ImageWrapper>
                <LockerImage
                  src="/Lockerbol.svg"
                  alt="Locker"
                />
              </ImageWrapper>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
