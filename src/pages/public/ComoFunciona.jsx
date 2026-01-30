import { useState } from "react";
import { styled } from "../../../styled-system/jsx";
import {
  BoxArrowDownIcon,
  BoxArrowUpIcon,
  DeviceMobileIcon,
  LockersIcon,
  QrCodeIcon,
  LockOpenIcon,
} from "@phosphor-icons/react";

export default function ComoFunciona() {
  const [flow, setFlow] = useState("deposit");

  return (
    <Container>
      <Section>
        {/* HEADER */}
        <Header>
          <h1>Cómo funciona Lockerbol</h1>
          <p>
            Elige si deseas depositar o retirar un paquete y conoce el proceso
            paso a paso.
          </p>
        </Header>

        {/* FLOW SELECTOR */}
        <FlowSelector>
          <FlowCard
            active={flow === "deposit"}
            onClick={() => setFlow("deposit")}
          >
            <BoxArrowDownIcon size={28} />
            <span>Depositar paquete</span>
          </FlowCard>

          <FlowCard
            active={flow === "withdraw"}
            onClick={() => setFlow("withdraw")}
          >
            <BoxArrowUpIcon size={28} />
            <span>Retirar paquete</span>
          </FlowCard>
        </FlowSelector>

        {/* STEPPER */}
        <Stepper>
          {flow === "deposit" ? (
            <>
              <StepItem
                step="1"
                title="Configura el depósito"
                description="Selecciona el locker y completa los datos del paquete desde la app."
                icon={<DeviceMobileIcon size={24} />}
              />
              <StepItem
                step="2"
                title="Genera el acceso"
                description="La app crea un PIN o QR para abrir el compartimento."
                icon={<QrCodeIcon size={24} />}
              />
              <StepItem
                step="3"
                title="Deposita el paquete"
                description="Abre el locker, guarda el paquete y cierra la puerta."
                icon={<BoxArrowDownIcon size={24} />}
              />
              <StepItem
                step="4"
                title="Notificación automática"
                description="El destinatario recibe el código para retirar el paquete."
                icon={<LockOpenIcon size={24} />}
              />
            </>
          ) : (
            <>
              <StepItem
                step="1"
                title="Recibe el acceso"
                description="Obtén el PIN o QR enviado por la app."
                icon={<QrCodeIcon size={24} />}
              />
              <StepItem
                step="2"
                title="Dirígete al locker"
                description="Acude al locker asignado cuando te resulte conveniente."
                icon={<LockersIcon size={24} />}
              />
              <StepItem
                step="3"
                title="Accede al compartimento"
                description="Ingresa el PIN o escanea el QR en el locker."
                icon={<LockOpenIcon size={24} />}
              />
              <StepItem
                step="4"
                title="Retira el paquete"
                description="Abre el compartimento y recoge tu paquete."
                icon={<BoxArrowUpIcon size={24} />}
              />
            </>
          )}
        </Stepper>
      </Section>
    </Container>
  );
}

/* ================= COMPONENTS ================= */

function StepItem({ step, title, description, icon }) {
  return (
    <Step>
      <StepIndicator>{step}</StepIndicator>
      <StepContent>
        <IconWrap>{icon}</IconWrap>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </StepContent>
    </Step>
  );
}

/* ================= STYLES ================= */

const Container = styled("section", {
  base: {
    bg: "background",
    color: "textPrimary",
    minH: "100vh",
    py: { base: "5rem", md: "7rem" },
  },
});

const Section = styled("div", {
  base: {
    maxW: "1000px",
    mx: "auto",
    px: { base: "1.5rem", md: "2rem" },
  },
});

const Header = styled("div", {
  base: {
    textAlign: "center",
    mb: "3rem",
    "& h1": {
      fontSize: { base: "2rem", md: "2.6rem" },
      fontWeight: 800,
      mb: "1rem",
    },
    "& p": {
      color: "textSecondary",
      maxW: "600px",
      mx: "auto",
      lineHeight: 1.6,
    },
  },
});

const FlowSelector = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    mb: "4rem",
    flexWrap: "wrap",
  },
});

const FlowCard = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    px: "1.5rem",
    py: "1rem",
    w: { base: "65%", sm: "auto" },
    
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "border",
    bg: "surface",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.25s ease",
    _hover: {
      transform: "translateY(-2px)",
    },
  },
  variants: {
    active: {
      true: {
        bg: "primary",
        color: "onPrimary",
        borderColor: "primary",
      },
    },
  },
});

const Stepper = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

const Step = styled("div", {
  base: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "flex-start",
  },
});

const StepIndicator = styled("div", {
  base: {
    w: "36px",
    h: "36px",
    borderRadius: "full",
    bg: "primary",
    color: "onPrimary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    flexShrink: 0,
  },
});

const StepContent = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    "& h3": {
      fontWeight: 700,
      mb: "0.25rem",
    },
    "& p": {
      color: "textSecondary",
      lineHeight: 1.6,
      fontSize: "0.95rem",
    },
  },
});

const IconWrap = styled("div", {
  base: {
    w: "40px",
    h: "40px",
    borderRadius: "12px",
    bg: "surface",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
});
