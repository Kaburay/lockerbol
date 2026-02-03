// src/pages/private/Dashboard.jsx
import { styled } from "../../../styled-system/jsx";
import useAuth from "../../auth/auth.store";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    
      <Content>

        <Header>
          <h1>Hola {user?.username || "usuario"}</h1>
          <p>Resumen de tu actividad en Lockerbol</p>
        </Header>

        <Grid>

          <StatCard>
            <h3>Paquetes activos</h3>
            <strong>2</strong>
            <span>En lockers</span>
          </StatCard>

          <StatCard>
            <h3>Historial</h3>
            <strong>14</strong>
            <span>Movimientos totales</span>
          </StatCard>

          <StatCard>
            <h3>Saldo</h3>
            <strong>150</strong>
            <span>LockerCoins</span>
          </StatCard>

          <StatCard>
            <h3>Notificaciones</h3>
            <strong>3</strong>
            <span>No leídas</span>
          </StatCard>

        </Grid>

        <Section>
          <h2>Actividad reciente</h2>

          <ActivityList>

            <ActivityItem>
              <strong>Depósito completado</strong>
              <p>Tu paquete fue guardado en Locker A12</p>
              <time>hace 21 min</time>
            </ActivityItem>

            <ActivityItem>
              <strong>Recarga exitosa</strong>
              <p>Recibiste 50 LockerCoins</p>
              <time>hace 3 h</time>
            </ActivityItem>

            <ActivityItem>
              <strong>Verificación completada</strong>
              <p>Tu cuenta ahora está verificada</p>
              <time>1 día</time>
            </ActivityItem>

          </ActivityList>
        </Section>

      </Content>
    
  );
}

/* ================== STYLES ================== */


const Content = styled("div", {
  base: {
    py: "2rem",
    px: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2.5rem",
    overflowY: "auto", 
  },
});

const Header = styled("div", {
  base: {
    "& h1": {
      fontSize: "2rem",
      fontWeight: 800,
      color: "textPrimary",
    },
    "& p": {
      mt: "0.3rem",
      fontSize: "1rem",
      color: "textSecondary",
    },
  },
});

const Grid = styled("div", {
  base: {
    display: "grid",
    gap: "1.25rem",
    gridTemplateColumns: {
      base: "1fr",
      md: "repeat(2, 1fr)",
      lg: "repeat(4, 1fr)",
    },
  },
});

const StatCard = styled("div", {
  base: {
    bg: "rgba(255,255,255,0.05)",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "18px",
    p: "1.5rem",
    backdropFilter: "blur(8px)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",

    "& h3": {
      fontSize: "0.9rem",
      color: "textSecondary",
      fontWeight: 600,
    },

    "& strong": {
      fontSize: "1.8rem",
      color: "textPrimary",
      fontWeight: 800,
    },

    "& span": {
      fontSize: "0.8rem",
      color: "textSecondary",
    },
  },
});

const Section = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",

    "& h2": {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "textPrimary",
    },
  },
});

const ActivityList = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const ActivityItem = styled("div", {
  base: {
    bg: "rgba(255,255,255,0.04)",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "16px",
    p: "1.2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",

    "& strong": {
      fontSize: "0.95rem",
      color: "textPrimary",
      fontWeight: 700,
    },

    "& p": {
      fontSize: "0.9rem",
      color: "textSecondary",
    },

    "& time": {
      mt: "0.3rem",
      fontSize: "0.75rem",
      color: "textSecondary",
      opacity: 0.7,
    },
  },
});
