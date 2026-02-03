// src/components/ui/Stepper.jsx
import { styled } from "../../../styled-system/jsx";

// --------------------
// Constants
// --------------------

const CIRCLE_SIZE = 24;
const LINE_HEIGHT = 4;

// --------------------
// Styled components
// --------------------

const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "row",
    paddingY: "8px",
    width: "100%",
  },
});

const StepWrapper = styled("div", {
  base: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Circle = styled("div", {
  base: {
    width: `${CIRCLE_SIZE}px`,
    height: `${CIRCLE_SIZE}px`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    boxShadow: "sm",
  },
});

const Line = styled("div", {
  base: {
    position: "absolute",
    top: `${CIRCLE_SIZE / 2 - LINE_HEIGHT / 2}px`,
    height: `${LINE_HEIGHT}px`,
    left: "50%",
    right: "-50%",
    background: "border",
    zIndex: 1,
    borderRadius: "999px",
    overflow: "hidden",
  },
});

const LineProgress = styled("div", {
  base: {
    height: "100%",
    background: "primary",
    borderRadius: "999px",
  },
});

const TextContainer = styled("div", {
  base: {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80px",
    textAlign: "center",
  },
});

const StatusText = styled("span", {
  base: {
    fontSize: "8px",
    fontWeight: "600",
    marginBottom: "2px",
  },
});

const LabelText = styled("span", {
  base: {
    fontSize: "10px",
    fontWeight: "400",
    color: "textPrimary",
  },
});

const Checkmark = styled("span", {
  base: {
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
  },
});

const Cube = styled("div", {
  base: {
    width: "16px",
    height: "16px",
    background: "white",
    borderRadius: "4px",
  },
});

// --------------------
// Component
// --------------------

export default function Stepper({ currentStep, totalSteps }) {
  const steps = [
    { label: "Selecciona tu locker", description: "Elige tu ubicación" },
    { label: "Selecciona tu casillero", description: "Escoge el tamaño" },
    { label: "Describe tu paquete", description: "Añade detalles" },
  ];

  const getStepStatus = (index) => {
    if (index < currentStep - 1) return "completed";
    if (index === currentStep - 1) return "in-progress";
    return "pending";
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "in-progress":
        return "En progreso";
      case "pending":
        return "Pendiente";
      default:
        return "";
    }
  };

  const renderIcon = (status) => {
    if (status === "completed") return <Checkmark>✓</Checkmark>;
    if (status === "in-progress") return <Cube />;
    return null;
  };

  return (
    <Container>
      {steps.slice(0, totalSteps).map((step, index) => {
        const status = getStepStatus(index);
        const isActive = status === "completed" || status === "in-progress";
        const showLine = index < totalSteps - 1;

        return (
          <StepWrapper key={index}>
            {/* Línea */}
            {showLine && (
              <Line>
                {status === "completed" && (
                  <LineProgress style={{ width: "100%" }} />
                )}
                {status === "in-progress" && (
                  <LineProgress style={{ width: "50%" }} />
                )}
              </Line>
            )}

            {/* Círculo */}
            <Circle
              style={{
                background: isActive ? "var(--colors-primary)" : "var(--colors-border)",
              }}
            >
              {renderIcon(status)}
            </Circle>

            {/* Texto */}
            <TextContainer>
              <StatusText
                style={{
                  color: isActive
                    ? "var(--colors-primary)"
                    : "var(--colors-border)",
                }}
              >
                {getStatusText(status)}
              </StatusText>
              <LabelText title={step.label}>{step.label}</LabelText>
            </TextContainer>
          </StepWrapper>
        );
      })}
    </Container>
  );
}
