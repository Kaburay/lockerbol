// src/components/ScrollToTop.jsx
import { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { styled } from "../../../styled-system/jsx";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ScrollToTop() {
  const { y } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(y > 300);
  }, [y]);

  const scrollToTop = () => {
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!visible) return null;

  return (
    <Up onClick={scrollToTop} aria-label="Volver arriba">
      <ArrowUpIcon size={20} weight="bold" />
    </Up>
  );
}

/* =================== STYLES =================== */

const Up = styled("button", {
  base: {
    width: "3rem",
    height: "3rem",
    borderRadius: "full",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 1000,

    bg: "primary",
    color: "onPrimary",
    border: "2px solid",
    cursor: "pointer",

    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",

    transition: "all 0.25s ease",

    _hover: {
      transform: "translateY(-4px)",
      opacity: 0.9,
    },

    _active: {
      transform: "translateY(0)",
    },
  },
});
