import { styled } from "../../../styled-system/jsx";
import {
  WhatsappLogoIcon,
  EnvelopeSimpleIcon,
  QuestionIcon,
} from "@phosphor-icons/react";

export default function Soporte() {
  return (
    <Container>
      <Section>
        {/* HEADER */}
        <Header>
          <h1>Soporte</h1>
          <p>
            ¿Tienes dudas o necesitas ayuda? Estamos aquí para apoyarte.
          </p>
        </Header>

        {/* SUPPORT OPTIONS */}
        <SupportGrid>
          <SupportCard as="a"
            href="https://wa.me/591XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrap>
              <WhatsappLogoIcon size={28} weight="fill" />
            </IconWrap>
            <h3>WhatsApp</h3>
            <p>Atención rápida y directa desde tu celular.</p>
          </SupportCard>

          <SupportCard as="a" href="mailto:soporte@lockerbol.com">
            <IconWrap>
              <EnvelopeSimpleIcon size={28} />
            </IconWrap>
            <h3>Correo electrónico</h3>
            <p>Escríbenos y te responderemos lo antes posible.</p>
          </SupportCard>

          <SupportCard disabled>
            <IconWrap>
              <QuestionIcon size={28} />
            </IconWrap>
            <h3>Preguntas frecuentes</h3>
            <p>Estamos preparando esta sección.</p>
          </SupportCard>
        </SupportGrid>

        {/* FOOT NOTE */}
        <FootNote>
          <span>Horario de atención:</span>
          <span>Lunes a Viernes · 09:00 – 18:00</span>
        </FootNote>
      </Section>
    </Container>
  );
}

const Container = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    color: "textPrimary",
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
    mb: "4rem",
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

const SupportGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      md: "1fr 1fr 1fr",
    },
    gap: "1.5rem",
  },
});

const SupportCard = styled("div", {
  base: {
    bg: "surface",
    borderRadius: "20px",
    p: "2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
    color: "textPrimary",

    _hover: {
      transform: "translateY(-6px)",
      bg: "backgroundSecondary",
    },

    "& h3": {
      fontWeight: 700,
      mt: "0.5rem",
    },

    "& p": {
      fontSize: "0.95rem",
      color: "textSecondary",
      lineHeight: 1.5,
    },

    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

const IconWrap = styled("div", {
  base: {
    w: "56px",
    h: "56px",
    borderRadius: "16px",
    bg: "primary",
    color: "onPrimary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const FootNote = styled("div", {
  base: {
    mt: "4rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "textMuted",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
});
