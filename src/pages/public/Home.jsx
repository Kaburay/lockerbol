// src/pages/Home.jsx

import { Link } from "react-router-dom";
import { styled } from "../../../styled-system/jsx";
import { LockIcon, ClockIcon, MapPinIcon, DevicesIcon, PackageIcon, ShoppingCartSimpleIcon, ArrowsLeftRightIcon, UsersIcon, CircuitryIcon } from "@phosphor-icons/react";
import image from "../../assets/Locker_img.png";
import quees from "../../assets/quees_img.png";

import useAuth from "../../auth/auth.store";

export default function Home() {
  const { user } = useAuth();



  return (
    <HomeContainer id="home">
      {/* Hero Section */}
      <Hero>
        <SectionContainer>
          <HeroGrid>
            {/* LEFT */}
            <HeroLeft>
              <h1>
                Lockers inteligentes
                <br />
                para recibir tus paquetes
                <br />
                <span>sin esperar</span>
              </h1>

              <p>
                Recoge, envía y gestiona tus paquetes desde lockers inteligentes,
                disponibles 24/7 en puntos estratégicos de tu ciudad.
              </p>

              <HeroActions>
                <PrimaryButton to={user ? "/dashboard" : "/login"}>
                  {user ? "Ir a mi panel" : "Empezar ahora"}
                </PrimaryButton>
                <SecondaryButton to="/como-funciona">
                  Cómo funciona
                </SecondaryButton>
              </HeroActions>
            </HeroLeft>

            {/* CENTER */}
            <HeroCenter>
              <Glow />
              <LockerVisual>
                {/* Reemplaza esto por una imagen real cuando quieras */}
                
                <img src={image} alt="Locker inteligente" />
              </LockerVisual>
            </HeroCenter>

            {/* RIGHT */}
            <HeroRight>
              <TrustItem>
                <LockIcon size={20} />
                <span>Seguridad monitoreada</span>
              </TrustItem>
              <TrustItem>
                <ClockIcon size={20} />
                <span>Disponible 24/7</span>
              </TrustItem>
              <TrustItem>
                <MapPinIcon size={20} />
                <span>Ubicaciones estratégicas</span>
              </TrustItem>
              <TrustItem>
                <DevicesIcon size={20} />
                <span>Control desde tus dispositivos</span>
              </TrustItem>
            </HeroRight>
          </HeroGrid>
        </SectionContainer>
      </Hero>

      {/* Casos de uso */}
      <UseCases>
        <SectionContainer>
          <UseCasesHeader>
            <h2>Diseñado para la vida real</h2>
            <p>
              LockerBol se adapta a distintas situaciones cotidianas donde el
              tiempo, la seguridad y la comodidad importan.
            </p>
          </UseCasesHeader>

          <UseCaseGrid>
            <UseCaseCard>
              <PackageIcon size={40} />
              <h3>Recibir paquetes sin estar en casa</h3>
              <p>
                Recibe tus envíos aunque no puedas atenderlos en el momento.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <ShoppingCartSimpleIcon size={40} />
              <h3>Ventas por internet</h3>
              <p>
                Entregas asincrónicas entre vendedores y compradores.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <ArrowsLeftRightIcon size={40} />
              <h3>Intercambio de objetos</h3>
              <p>
                Documentos, llaves u objetos sin contacto directo.
              </p>
            </UseCaseCard>

            <UseCaseCard>
              <UsersIcon size={40} />
              <h3>Uso personal o empresarial</h3>
              <p>
                Soluciones tanto para personas como para pequeños negocios.
              </p>
            </UseCaseCard>
          </UseCaseGrid>
        </SectionContainer>
      </UseCases>

      <ServiceContainer>
        <SectionContainerS>
          <ServiceGrid>
            {/* LEFT - Content */}
            <ContentSide>
              <Label>NUESTRO SERVICIO</Label>
              <Title>¿QUÉ ES LOCKERBOL?</Title>
              <Description>
                LockerBol es una red de lockers inteligentes diseñada para
                facilitar la entrega, recepción y resguardo de objetos físicos de
                forma segura, flexible y sin depender de la coordinación directa
                entre personas.
              </Description>

              <FeatureList>
                <FeatureItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>Lockers Inteligentes</span>
                </FeatureItem>
                <FeatureItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>Seguridad Garantizada</span>
                </FeatureItem>
                <FeatureItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>Acceso 24/7</span>
                </FeatureItem>
                <FeatureItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>Sin Coordinación Directa</span>
                </FeatureItem>
              </FeatureList>
            </ContentSide>

            {/* RIGHT - Illustration */}
            <IllustrationSide>
              <GridPattern />
              <img src={quees} alt="¿Qué es LockerBol?" />
            </IllustrationSide>
          </ServiceGrid>
        </SectionContainerS>
      </ServiceContainer>

      

      {/* Por qué elegir LockerBol */}
      <WhyLockerBol>
        <SectionContainer>
          <WhyHeader>
            <h2>¿Por qué elegir LockerBol?</h2>
          </WhyHeader>

          <WhyGrid>
            <WhyCard>
              <ClockIcon size={40} />
              <h3>Flexibilidad real</h3>
              <p>
                Tú decides cuándo entregar o recoger, sin depender de horarios ni terceros.
              </p>
            </WhyCard>

            <WhyCard>
              <MapPinIcon size={40} />
              <h3>Pensado para Bolivia</h3>
              <p>
                Un sistema diseñado según necesidades y dinámicas locales.
              </p>
            </WhyCard>

            <WhyCard>
              <CircuitryIcon size={40} />
              <h3>Tecnología aplicada a lo físico</h3>
              <p>
                Más que lockers: una plataforma que conecta personas y objetos.
              </p>
            </WhyCard>
          </WhyGrid>
        </SectionContainer>
      </WhyLockerBol>

      

      {/* CTA Final */}
      <CTAFinal>
        <SectionContainer>
          <CTAGrid>
            <CTAContent>
              <h2>Empieza a usar LockerBol hoy</h2>
              <p>
                Simplifica cómo entregas y recibes objetos, sin depender de horarios
                ni coordinación directa.
              </p>

              <CTAMeta>
                <span>Sin costo inicial</span>
                <Divider />
                <span>Acceso inmediato</span>
                <Divider />
                <span>Disponible 24/7</span>
              </CTAMeta>

              <PrimaryButton to={user ? "/dashboard" : "/login"}>
                {user ? "Abrir Lockerbol" : "Crear cuenta gratis"}
              </PrimaryButton>

            </CTAContent>
          </CTAGrid>
        </SectionContainer>

        <CTAGlow />
      </CTAFinal>
    </HomeContainer>
  );
}

/* =================== STYLES =================== */

const HomeContainer = styled("div", {
  base: {
    fontFamily: "sans-serif",
  },
});

const Hero = styled("section", {
  base: {
    background: "background",
    color: "white",
    textAlign: "center",
    pt: "9rem",
    pb: "6rem",
    minHeight: "100vh",
  },
});

const SectionContainer = styled("div", {
  base: {
    maxW: "1200px",
    mx: "auto",
    px: { base: "1.5rem", md: "2rem" },
    w: "100%",
  },
});

const HeroGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      lg: "1fr 1fr 1fr",
    },
    gap: { base: "3rem", lg: "4rem" },
    alignItems: "center",
  },
});

const HeroLeft = styled("div", {
  base: {
    textAlign: { base: "center", lg: "left" },
    "& h1": {
      fontSize: { base: "2.2rem", md: "3rem", lg: "3.5rem" },
      fontWeight: 800,
      lineHeight: 1.1,
      color: "textPrimary",
      mb: "1.25rem",
      "& span": {
        color: "primary",
      },
    },
    "& p": {
      fontSize: "1.05rem",
      color: "textSecondary",
      maxW: "460px",
      mb: "2rem",
      mx: { base: "auto", lg: "0" },
    },
  },
});

const HeroActions = styled("div", {
  base: {
    display: "flex",
    gap: "1rem",
    justifyContent: { base: "center", lg: "flex-start" },
    flexWrap: "wrap",
  },
});

const PrimaryButton = styled(Link, {
  base: {
    px: "1.5rem",
    py: "0.75rem",
    borderRadius: "999px",
    bg: "primary",
    color: "onPrimary",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
    _hover: {
      transform: "translateY(-2px)",
      opacity: 0.9,
    },
  },
});

const SecondaryButton = styled(Link, {
  base: {
    px: "1.5rem",
    py: "0.75rem",
    borderRadius: "999px",
    border: "1px solid",
    borderColor: "border",
    color: "textPrimary",
    textDecoration: "none",
    fontWeight: 500,
    transition: "all 0.25s ease",
    _hover: {
      bg: "surface",
    },
  },
});

const HeroCenter = styled("div", {
  base: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
});

const Glow = styled("div", {
  base: {
    position: "absolute",
    w: "320px",
    h: "320px",
    bg: "primary",
    opacity: 0.18,
    filter: "blur(140px)",
    zIndex: 0,
  },
});

const LockerVisual = styled("div", {
  base: {
    position: "relative",
    zIndex: 1,
  },
});



const HeroRight = styled("ul", {
  base: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    color: "textPrimary",
    fontSize: "0.95rem",
    textAlign: { base: "center", lg: "left" },
    alignItems: { base: "center", lg: "flex-start" },
  },
});

const TrustItem = styled("li", {
  base: {
    display: "flex",
    gap: "0.6rem",
    alignItems: "center",
    "& span": {
      color: "textPrimary",
    },
  },
});


const CTAButton = styled("button", {
  base: {
    display: "inline-block",
    bg: "primary",
    color: "white",
    px: "1.5rem",
    py: "0.75rem",
    borderRadius: "5px",
    fontWeight: 700,
    mt: "1rem",
    cursor: "pointer",
    border: "none",
    _hover: {
      bg: "backgroundSecondary",
    },
    transition: "background 0.2s",
  },
});

const UseCases = styled("section", {
  base: {
    bg: "backgroundSecondary",
    py: { base: "4rem", md: "6rem", lg: "8rem"},
    position: "relative",
  },
});

const UseCasesHeader = styled("div", {
  base: {
    textAlign: "center",
    maxW: "700px",
    mx: "auto",
    mb: "3rem",
    "& h2": {
      fontSize: { base: "1.8rem", md: "2.2rem", lg: "3rem" },
      fontWeight: 800,
      lineHeight: 1.2,
      color: "onPrimary",
      mb: "0.75rem",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: { base: "0.75rem", md: "0.875rem" },
      fontWeight: 500,
      letterSpacing: "0.1em",
      color: "onPrimary",
      textTransform: "uppercase",
    },
  },
});

const UseCaseGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      sm: "1fr 1fr",
      lg: "1fr 1fr 1fr 1fr",
    },
    gap: "1.5rem",
  },
});

const UseCaseCard = styled("div", {
  base: {
    position: "relative",
    bg: "background",
    borderRadius: "24px",
    p: "1.5rem",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    _hover: {
      transform: "translateY(-8px)",
      borderColor: "primary",
    },
    color: "textPrimary",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    "& h3": {
      mt: "1rem",
      fontSize: { base: "1.25rem", md: "1.5rem" },
      mb: "1rem",
      fontWeight: 700,
      letterSpacing: "0.05em",
    },
    "& p": {
      fontSize: "0.95rem",
      lineHeight: 1.6,
      color: "textSecondary",
    },
  },
});

const ServiceContainer = styled("section", {
  base: {
    bg: "background",
    py: { base: "4rem", md: "6rem", lg: "8rem" },
    position: "relative",
    overflow: "hidden",
  },
});

const SectionContainerS = styled("div", {
  base: {
    maxW: "1200px",
    mx: "auto",
    px: { base: "1.5rem", md: "2rem" },
    w: "100%",
  },
});

const ServiceGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      lg: "1fr 1fr",
    },
    gap: { base: "3rem", lg: "5rem" },
    alignItems: "center",
  },
});

/* ---------- LEFT CONTENT ---------- */

const ContentSide = styled("div", {
  base: {
    textAlign: { base: "center", lg: "left" },
    order: { base: 2, lg: 1 },
  },
});

const Label = styled("p", {
  base: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    color: "textSecondary",
    mb: "1rem",
    textTransform: "uppercase",
  },
});

const Title = styled("h2", {
  base: {
    fontSize: { base: "1.8rem", md: "2.2rem", lg: "3rem" },
    fontWeight: 800,
    lineHeight: 1.2,
    color: "textPrimary",
    mb: "1.5rem",
    letterSpacing: "0.02em",
  },
});

const Description = styled("p", {
  base: {
    fontSize: "1.2rem",
    lineHeight: 1.7,
    color: "textSecondary",
    mb: "2rem",
    maxW: { base: "100%", lg: "520px" },
    mx: { base: "auto", lg: "0" },
  },
});

const FeatureList = styled("ul", {
  base: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.875rem",
    mx: { base: "auto", lg: "0" },
    maxW: { base: "400px", lg: "100%" },
  },
});

const FeatureItem = styled("li", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.95rem",
    color: "textSecondary",
    justifyContent: { base: "center", lg: "flex-start" },
    "& span": {
      color: "textPrimary",
    },
  },
});

const CheckIcon = styled("span", {
  base: {
    w: "24px",
    h: "24px",
    borderRadius: "50%",
    bg: "primary",
    color: "onPrimary",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 700,
    flexShrink: 0,
  },
});

/* ---------- RIGHT ILLUSTRATION ---------- */

const IllustrationSide = styled("div", {
  base: {
    position: "relative",
    minH: { base: "400px", md: "500px" },
    order: { base: 1, lg: 2 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const GridPattern = styled("div", {
  base: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    opacity: 0.5,
    pointerEvents: "none",
  },
});



const WhyLockerBol = styled("section", {
  base: {
    bg: "backgroundSecondary",
    py: { base: "4rem", md: "6rem", lg: "8rem" },
    position: "relative",
  },
});

const WhyHeader = styled("div", {
  base: {
    textAlign: "center",
    mx: "auto",
    mb: "3rem",
    "& h2": {
      fontSize: { base: "1.8rem", md: "2.2rem", lg: "3rem" },
      fontWeight: 800,
      lineHeight: 1.2,
      color: "onPrimary",
      mb: "0.75rem",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
    },
  },
});

const WhyGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      md: "1fr 1fr 1fr",
    },
    gap: "2rem",
  },
});

const WhyCard = styled("div", {
  base: {
    position: "relative",
    bg: "background",
    borderRadius: "24px",
    p: "2rem",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    _hover: {
      transform: "translateY(-8px)",
      borderColor: "primary",
    },
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    color: "textPrimary",
    textAlign: "center",
    "& h3": {
      mt: "1rem",
      mb: "0.75rem",
      fontWeight: 700,
      color: "textPrimary",
      letterSpacing: "0.05em",
    },
    "& p": {
      color: "textSecondary",
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },
  },
});

const CTAFinal = styled("section", {
  base: {
    position: "relative",
    bg: "background",
    py: { base: "5rem", md: "7rem", lg: "9rem" },
    overflow: "hidden",
    textAlign: "center",
  },
});

const CTAGrid = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
  },
});

const CTAContent = styled("div", {
  base: {
    maxW: "720px",
    mx: "auto",
    zIndex: 1,
    "& h2": {
      fontSize: { base: "2rem", md: "2.6rem", lg: "3.2rem" },
      fontWeight: 800,
      lineHeight: 1.1,
      color: "textPrimary",
      mb: "1.25rem",
    },
    "& p": {
      fontSize: "1.1rem",
      color: "textSecondary",
      mb: "2rem",
      lineHeight: 1.6,
    },
  },
});

const CTAMeta = styled("div", {
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.75rem",
    mb: "2.5rem",
    flexWrap: "wrap",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "textMuted",
  },
});

const Divider = styled("span", {
  base: {
    w: "4px",
    h: "4px",
    borderRadius: "50%",
    bg: "textMuted",
    display: "inline-block",
  },
});

const CTAGlow = styled("div", {
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    w: "200px",
    h: "150px",
    bg: "primary",
    opacity: 0.3,
    filter: "blur(140px)",
    zIndex: 0,
  },
});

