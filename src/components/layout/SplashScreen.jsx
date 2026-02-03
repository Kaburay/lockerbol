// src/components/layout/SplashScreen.jsx
import { styled } from "../../../styled-system/jsx";
import logo from "/Lockerbol.svg";

const Wrapper = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "background",
    zIndex: 9999,
  },
});

const Content = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    animation: "fadeIn 0.4s ease-out",
  },
});

const Logo = styled("img", {
  base: {
    width: "116px",
    height: "116px",
    animation: "pulse 1s infinite",
  },
});

const Text = styled("span", {
  base: {
    fontSize: "sm",
    color: "textSecondary",
    letterSpacing: "0.1em",
  },
});

export default function SplashScreen() {
  return (
    <Wrapper>
      <Content>
        <Logo src={logo} alt="LockerBol" />
        <Text>Cargando Lockerbol</Text>
      </Content>
    </Wrapper>
  );
}
