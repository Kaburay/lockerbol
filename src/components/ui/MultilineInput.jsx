// src/components/ui/MultilineInput.jsx
// src/components/ui/MultilineInput.jsx
import { useRef, useEffect } from "react";
import { styled } from "../../../styled-system/jsx";

const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "flex-start",
    paddingX: "20px",
    paddingY: "10px",
    borderRadius: "20px",
    borderWidth: "1px",
    borderColor: "border",
    width: "100%",
    bg: "transparent",
  },
});

const Textarea = styled("textarea", {
  base: {
    width: "100%",
    fontSize: "16px",
    color: "textPrimary",
    bg: "transparent",
    outline: "none",
    border: "none",
    resize: "none",
    lineHeight: "20px",
    minHeight: "40px",

    _placeholder: {
      color: "textMuted",
    },
  },
});

export default function MultilineInput({
  value,
  onChange,
  placeholder,
  maxLines = 3,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const LINE_HEIGHT = 20;
    const MIN_HEIGHT = 40;
    const MAX_HEIGHT =
      MIN_HEIGHT + LINE_HEIGHT * (maxLines - 1);

    ref.current.style.height = "auto";
    ref.current.style.height = `${Math.min(
      ref.current.scrollHeight,
      MAX_HEIGHT
    )}px`;
  }, [value, maxLines]);

  return (
    <Container>
      <Textarea
        ref={ref}
        value={value}
        placeholder={placeholder}
        rows={1}
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  );
}
