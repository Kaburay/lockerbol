// src/components/ui/TimeLimitSegmented.jsx
import { styled } from "../../../styled-system/jsx";

const Container = styled("div", {
  base: {
    display: "flex",
    width: "100%",
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "30px",
    overflow: "hidden",
  },
});

const Segment = styled("button", {
  base: {
    flex: 1,
    paddingY: "12px",
    textAlign: "center",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
    bg: "transparent",
    color: "textPrimary",
    border: "none",

    _hover: {
      bg: "backgroundSecondary",
    },

    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "-2px",
    },
  },

  variants: {
    active: {
      true: {
        bg: "primary",
        color: "onPrimary",
        fontWeight: "600",

        _hover: {
          bg: "primary",
        },
      },
    },
  },
});

export default function TimeLimitSegmented({
  options,
  selectedHours,
  onSelect,
}) {
  return (
    <Container>
      {options.map((opt) => {
        const active = opt.hours === selectedHours;

        return (
          <Segment
            key={opt.hours}
            type="button"
            active={active}
            onClick={() => onSelect(opt.hours)}
          >
            {opt.label}
          </Segment>
        );
      })}
    </Container>
  );
}
