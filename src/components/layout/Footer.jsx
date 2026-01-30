// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { styled } from "../../../styled-system/jsx";
import {
  InstagramLogoIcon,
  WhatsappLogoIcon,
  TiktokLogoIcon,
} from "@phosphor-icons/react";

import logoline from "../../assets/logo_line.svg";
import googlePlay from "../../assets/GooglePlay.svg";
import appStore from "../../assets/AppStore.svg";

export default function Footer() {
  return (
    <FooterContainer>
      <Section>
        <Grid>
          {/* BRAND */}
          <Brand>
            <Logo>
                <img src={logoline} alt="LockerBol" />
            </Logo>
            <Description>
              Red de lockers inteligentes para enviar, recibir y resguardar
              objetos de forma segura, flexible y sin coordinación directa.
            </Description>

            <Socials>
              <a href="https://www.instagram.com/lockerbol.bo" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram LockerBol">
                <InstagramLogoIcon size={18} />
              </a>
              <a href="#" aria-label="WhatsApp">
                <WhatsappLogoIcon size={18} />
              </a>
              <a href="https://www.tiktok.com/@lockerbol.bo" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok LockerBol">
                <TiktokLogoIcon size={18} />
              </a>
            </Socials>
          </Brand>

          {/* PRODUCT */}
          <Column>
            <ColumnTitle>Producto</ColumnTitle>
            <FooterLink to="/como-funciona">Cómo funciona</FooterLink>
            <FooterLink to="/ubicaciones">Ubicaciones</FooterLink>
            <FooterLink to="/acerca-de">Acerca de</FooterLink>
          </Column>

          {/* LEGAL */}
          <Column>
            <ColumnTitle>Legal</ColumnTitle>
            <FooterLink to="/terminos">Términos de uso</FooterLink>
            <FooterLink to="/privacidad">Política de privacidad</FooterLink>
          </Column>
        </Grid>

        <Divider />

        <AppSection>
            <AppTitle>Descarga la app</AppTitle>

            <StoreBadges>
                <img src={googlePlay} alt="Disponible en Google Play" />
                <img src={appStore} alt="Disponible en App Store" />
            </StoreBadges>
        </AppSection>

        <Bottom>
          <span>© {new Date().getFullYear()} LockerBol</span>
          
        </Bottom>
      </Section>
    </FooterContainer>
  );
}

/* ================= STYLES ================= */

const FooterContainer = styled("footer", {
  base: {
    bg: "backgroundSecondary",
    color: "textPrimary",
  },
});

const Section = styled("div", {
  base: {
    maxW: "1200px",
    mx: "auto",
    px: { base: "1.5rem", md: "2rem" },
    py: { base: "3rem", md: "4rem" },
  },
});

const Grid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      md: "2fr 1fr 1fr 1fr",
    },
    gap: "3rem",
  },
});

/* BRAND */

const Brand = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

const Logo = styled("div", {
  base: {
    "& img": {
      h: "52px",
    },
  },
});

const Description = styled("p", {
  base: {
    fontSize: "0.95rem",
    color: "textSecondary",
    lineHeight: 1.6,
    maxW: "360px",
  },
});

const Socials = styled("div", {
  base: {
    display: "flex",
    gap: "0.75rem",
    mt: "0.5rem",

    "& a": {
      w: "36px",
      h: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "full",
      bg: "surface",
      color: "textPrimary",
      transition: "all 0.2s ease",

      _hover: {
        bg: "primary",
        color: "onPrimary",
      },
    },
  },
});

/* COLUMNS */

const Column = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
});

const ColumnTitle = styled("h4", {
  base: {
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    mb: "0.5rem",
  },
});

const FooterLink = styled(Link, {
  base: {
    fontSize: "0.95rem",
    color: "textSecondary",
    textDecoration: "none",
    transition: "color 0.2s",

    _hover: {
      color: "primary",
    },
  },
});

/* BADGES */

const AppSection = styled("div", {
  base: {
    mt: "2rem",
    
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "1rem",
  },
});

const AppTitle = styled("h4", {
  base: {
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
});

const StoreBadges = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    mb: "1rem",
    gap: "1rem",
    flexWrap: "nowrap",
  },
});

/* BOTTOM */

const Divider = styled("div", {
  base: {
    h: "1px",
    bg: "border",
    
  },
});

const Bottom = styled("div", {
  base: {
    display: "flex",
    flexDirection: { base: "column", md: "row" },
    justifyContent: "space-between",
    gap: "0.5rem",
    fontSize: "0.85rem",
    color: "textSecondary",
    textAlign: { base: "center", md: "left" },
  },
});
