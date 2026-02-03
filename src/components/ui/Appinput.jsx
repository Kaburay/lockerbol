// src/components/ui/AppInput.jsx
import { styled } from "../../../styled-system/jsx";
import { Box } from "../../../styled-system/jsx";

const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingX: "20px",
    paddingY: "10px",
    borderRadius: "30px",
    borderWidth: "1px",
    borderColor: "border",
    width: "100%",
    bg: "transparent",
  },
});

const Input = styled("input", {
  base: {
    flex: 1,
    fontSize: "16px",
    color: "textPrimary",
    bg: "transparent",
    outline: "none",
    border: "none",

    _placeholder: {
      color: "textMuted",
    },
  },
});

export default function AppInput({
  value,
  onChange,
  placeholder,
  type = "text",
  enterKeyHint = "done",
  onSubmit,
  icon, // ✅ ReactNode opcional
}) {
  return (
    <Container>
      {icon && (
        <Box color="textPrimary">
          {icon}
        </Box>
      )}

      <Input
        value={value}
        placeholder={placeholder}
        type={type}
        enterKeyHint={enterKeyHint}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit?.();
          }
        }}
      />
    </Container>
  );
}
