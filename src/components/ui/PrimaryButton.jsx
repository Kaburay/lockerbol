// src/components/ui/PrimaryButton.jsx
import { styled } from "../../../styled-system/jsx";

const Button = styled("button", {
  base: {
    width: "100%",
    borderRadius: "30px",
    paddingY: "15px",
    marginBottom: "30px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: "20px",
    fontWeight: "500",

    bg: "primary",
    color: "onPrimary",

    cursor: "pointer",
    border: "none",

    transition: "opacity 0.2s ease, transform 0.1s ease",

    _hover: {
      opacity: 0.9,
    },

    _active: {
      transform: "scale(0.98)",
    },

    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px",
    },

    _disabled: {
      bg: "gray",
      cursor: "not-allowed",
      opacity: 0.6,
      transform: "none",
    },
  },
});

const Content = styled("span", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
});

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  icon,
}) {
  return (
    <Button
      type="button"
      onClick={onPress}
      disabled={disabled}
    >
      <Content>
        {icon}
        {title}
      </Content>
    </Button>
  );
}
