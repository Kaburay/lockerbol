import { styled } from "../../../styled-system/jsx";
import {
  PackageIcon,
  MapPinIcon,
  ShieldCheckIcon,
  LightningIcon,
} from "@phosphor-icons/react";

export default function AcercaDe() {
  return (
    <Container>
      <Section>
        {/* HEADER */}
        <Header>
          <h1>Acerca de Lockerbol</h1>
          <p>
            Lockerbol es una solución moderna para la entrega y retiro de
            paquetes de forma segura, autónoma y sin complicaciones.
          </p>
        </Header>

        {/* WHAT WE DO */}
        <Block>
          <h2>¿Qué hacemos?</h2>
          <p>
            Facilitamos el depósito y retiro de paquetes a través de lockers
            inteligentes ubicados en puntos estratégicos. Nuestro sistema
            elimina esperas, reduce fricción y permite gestionar entregas de
            manera rápida desde una app.
          </p>
        </Block>

        {/* BENEFITS */}
        <BenefitsGrid>
          <BenefitCard>
            <IconWrap>
              <PackageIcon size={26} />
            </IconWrap>
            <h3>Entrega simple</h3>
            <p>Depósito y retiro en pocos pasos desde la app.</p>
          </BenefitCard>

          <BenefitCard>
            <IconWrap>
              <MapPinIcon size={26} />
            </IconWrap>
            <h3>Ubicaciones estratégicas</h3>
            <p>Lockers accesibles en puntos clave de la ciudad.</p>
          </BenefitCard>

          <BenefitCard>
            <IconWrap>
              <ShieldCheckIcon size={26} />
            </IconWrap>
            <h3>Seguridad</h3>
            <p>Códigos únicos y control total del acceso.</p>
          </BenefitCard>

          <BenefitCard>
            <IconWrap>
              <LightningIcon size={26} />
            </IconWrap>
            <h3>Rapidez</h3>
            <p>Sin filas, sin coordinación manual.</p>
          </BenefitCard>
        </BenefitsGrid>

        {/* VISION */}
        <Vision>
          <h2>Nuestra visión</h2>
          <p>
            Queremos transformar la forma en que las personas gestionan sus
            entregas, ofreciendo una infraestructura confiable que conecte a
            usuarios, comercios y operadores logísticos.
          </p>
        </Vision>
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
      fontSize: { base: "2.2rem", md: "2.8rem" },
      fontWeight: 800,
      mb: "1rem",
    },
    "& p": {
      color: "textSecondary",
      maxW: "720px",
      mx: "auto",
      lineHeight: 1.6,
    },
  },
});

const Block = styled("div", {
  base: {
    mb: "4rem",
    maxW: "720px",
    mx: "auto",
    textAlign: "center",
    "& h2": {
      fontSize: "1.6rem",
      fontWeight: 700,
      mb: "1rem",
    },
    "& p": {
      color: "textSecondary",
      lineHeight: 1.7,
    },
  },
});

const BenefitsGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr 1fr 1fr",
    },
    gap: "1.5rem",
    mb: "4rem",
  },
});

const BenefitCard = styled("div", {
  base: {
    bg: "surface",
    borderRadius: "20px",
    p: "1.75rem",
    textAlign: "center",
    transition: "all 0.25s ease",
    _hover: {
      transform: "translateY(-6px)",
      bg: "backgroundSecondary",
    },
    "& h3": {
      fontWeight: 700,
      mt: "0.75rem",
    },
    "& p": {
      fontSize: "0.9rem",
      color: "textSecondary",
      mt: "0.5rem",
      lineHeight: 1.5,
    },
  },
});

const IconWrap = styled("div", {
  base: {
    w: "52px",
    h: "52px",
    borderRadius: "16px",
    bg: "primary",
    color: "onPrimary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
  },
});

const Vision = styled("div", {
  base: {
    maxW: "720px",
    mx: "auto",
    textAlign: "center",
    "& h2": {
      fontSize: "1.6rem",
      fontWeight: 700,
      mb: "1rem",
    },
    "& p": {
      color: "textSecondary",
      lineHeight: 1.7,
    },
  },
});
