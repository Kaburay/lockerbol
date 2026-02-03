
import { styled } from "../../../styled-system/jsx";
import { useEffect } from "react";

const Backdrop = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    bg: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});

const Modal = styled("div", {
  base: {
    width: "85%",
    maxWidth: "420px",
    borderRadius: "20px",
    padding: "20px",

    bg: "surface",
    boxShadow: "lg",

    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

const Title = styled("h3", {
  base: {
    fontSize: "18px",
    fontWeight: "700",
  },
});

const Message = styled("p", {
  base: {
    fontSize: "15px",
    color: "textSecondary",
    lineHeight: "1.4",
  },
});

const Button = styled("button", {
  base: {
    alignSelf: "flex-end",

    paddingX: "20px",
    paddingY: "10px",
    borderRadius: "12px",

    bg: "primary",
    color: "onPrimary",
    fontWeight: "600",

    border: "none",
    cursor: "pointer",

    transition: "opacity 0.2s ease",

    _hover: {
      opacity: 0.9,
    },

    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px",
    },
  },
});

export default function AlertModal({
  visible,
  title = "Alerta",
  message,
  onClose,
  type = "info",
}) {
  // 🔒 bloquear scroll del body
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [visible]);

  if (!visible) return null;

  const titleColor =
    type === "error"
      ? "textPrimary"
      : type === "warning"
      ? "warning"
      : "textPrimary";

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title style={{ color: `var(--colors-${titleColor})` }}>
          {title}
        </Title>

        <Message>{message}</Message>

        <Button onClick={onClose}>Aceptar</Button>
      </Modal>
    </Backdrop>
  );
}
