// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/auth.store";
import { useState, useLayoutEffect, useEffect } from "react";
import { useWindowScroll } from "react-use";

import logo from "../../assets/logo_lock.svg";
import { styled } from "../../../styled-system/jsx";

import {ListIcon, XIcon, UserIcon, BellIcon} from "@phosphor-icons/react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [stateHeader, setStateHeader] = useState(false);

  const { y } = useWindowScroll();
  const notifications = [];

  useLayoutEffect(() => {
    if (y >= 50) {
      setStateHeader(true);
    } else {
      setStateHeader(false);
    }
  }, [y]);

  useEffect(() => {
    const closeProfile = () => setProfileOpen(false);
    const closeNotif = () => setNotifOpen(false);

    window.addEventListener("click", closeProfile);
    window.addEventListener("click", closeNotif);

    return () => {
      window.removeEventListener("click", closeProfile);
      window.removeEventListener("click", closeNotif);
    };
  }, []);


  return (
    <Nav scrolled={stateHeader}>
      <Container>
        {/* IZQUIERDA: HAMBURGER + LOGO */}
        <LeftGroup>
          <HamburgerButton
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
          </HamburgerButton>

          <Logo to="/">
            <img src={logo} alt="LockerBol" />
          </Logo>
        </LeftGroup>

        {/* LINKS CENTRALES (DESKTOP ONLY) */}
        <CenterLinks>
          <NavItem to="/como-funciona">Cómo funciona</NavItem>
          <NavItem to="/ubicaciones">Ubicaciones</NavItem>
          <NavItem to="/soporte">Soporte</NavItem>
        </CenterLinks>

        {/* ACCIONES DERECHA */}
        <RightActions>
          {!user ? (
            <>
              <TextButton to="/login">Registrarse</TextButton>
              <PrimaryButton to="/login">Iniciar sesión</PrimaryButton>
            </>
          ) : (
            <>
              {/* NOTIFICACIONES */}
              <IconButton
                scrolled={stateHeader}
                onClick={(e) => {
                  e.stopPropagation();
                  setNotifOpen((v) => !v);
                }}
              >
                <BellIcon size={20} weight="bold" />
              </IconButton>
              {notifOpen && (
                <ProfileDropdown style={{ right: "40px", top: "64px" }}>
                  {notifications.length === 0 ? (
                    <DropdownItem disabled>
                      No hay notificaciones
                    </DropdownItem>
                  ) : (
                    notifications.map((n, i) => (
                      <DropdownItem key={i} onClick={() => {
                        setNotifOpen(false);
                        // navega según tipo
                        if (n.type === "mensaje") navigate("/mensajes");
                        else if (n.type === "deposito") navigate(`/deposito/${n.idPaquete}`);
                      }}>
                        <strong>{n.title}</strong>
                        <p>{n.description}</p>
                        <small>{n.timeAgo}</small>
                      </DropdownItem>
                    ))
                  )}
                </ProfileDropdown>
              )}

              {/* PERFIL */}
              <AvatarWrapper>
                <AvatarButton
                  scrolled={stateHeader}
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((v) => !v);
                  }}
                >
                  <UserIcon size={20} weight="bold" />
                </AvatarButton>

                {profileOpen && (
                  <ProfileDropdown>
                    <ProfileHeader>
                      <UserIcon size={18} />
                      <div>
                        <span>{user?.username || "Usuario"}</span>
                      </div>
                    </ProfileHeader>

                    <DropdownItem onClick={() => {
                      setProfileOpen(false);
                      navigate("/perfil");
                    }}>Mi perfil</DropdownItem>

                    <DropdownItem>Configuración</DropdownItem>
                    <DropdownItem>Ayuda y comentarios</DropdownItem>
                    <Divider />
                    <LogoutItem onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}>Cerrar sesión</LogoutItem>
                  </ProfileDropdown>
                )}
              </AvatarWrapper>
            </>
          )}
        </RightActions>
      </Container>

      <MobileMenu open={menuOpen}>
        <NavItem to="/como-funciona">Cómo funciona</NavItem>
        <NavItem to="/ubicaciones">Ubicaciones</NavItem>
        <NavItem to="/soporte">Soporte</NavItem>
      </MobileMenu>
    </Nav>
  );
}

/* ================== STYLES ================== */

const Nav = styled("nav", {
  base: {
    position: "fixed",
    top: 0,
    h: "64px",
    zIndex: 100,
    w: "100%",
    px: "1.5rem",
    py: "0.75rem",
    backdropFilter: "blur(20px)",
    transition: "background 0.3s",
  },
  variants: {
    scrolled: {
      true: { bg: "surface" },
      false: { bg: "transparent" },
    },
  },
});


const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const LeftGroup = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
});

const HamburgerButton = styled("button", {
  base: {
    display: { base: "flex", lg: "none" },
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    bg: "transparent",
    border: "none",
    color: "primary",
    cursor: "pointer",
  },
});

const Logo = styled(Link, {
  base: {
    "& img": {
      h: "42px",
    },
  },
});

const CenterLinks = styled("ul", {
  base: {
    display: { base: "none", lg: "flex" },
    gap: "0.75rem",
    listStyle: "none",
    
  },
});

const MobileMenu = styled("div", {
  base: {
    display: "none",        // por defecto oculto
    flexDirection: "column",
    gap: "0.75rem",
    px: "1.5rem",
    py: "0.75rem",
    
  },
  variants: {
    open: {
      true: { display: "flex" },  // se muestra si open=true
    },
  },
});


const NavItem = styled(Link, {
  base: {
    px: "1rem",
    py: "0.45rem",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "textPrimary",
    bg: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "all 0.25s ease",
    _hover: {
      color: "primary",
      bg: "rgba(255,255,255,0.18)",
      borderColor: "rgba(255,255,255,0.3)",
    },
  },
});

const RightActions = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
});

const TextButton = styled(Link, {
  base: {
    display: { base: "none", md: "inline-flex" },
    bg: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "textPrimary",
    _hover: { color: "#cccccc" },
  },
});

const PrimaryButton = styled(Link, {
  base: {
    px: "1.1rem",
    py: "0.45rem",
    borderRadius: "999px",
    bg: "primary",
    color: "onPrimary",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.25s",
    _hover: { bg: "#fac926" },
  },
});

const IconButton = styled("button", {
  base: {
    p: "0.45rem",
    borderRadius: "999px",
    border: "none",
    color: "webicon",
    overflow: "hidden",
    cursor: "pointer",
    _hover: {
      color: "#898989",
      bg: "rgba(255,255,255,0.18)",
      borderColor: "rgba(255,255,255,0.3)",
    },
  },
  variants: {
    scrolled: {
      true: { bg: "wiconbg" },
      false: { bg: "transparent" },
    }, 
  },  
});

const AvatarWrapper = styled("div", {
  base: {
    position: "relative",
  },
});

const ProfileDropdown = styled("div", {
  base: {
    position: "absolute",
    top: "calc(100% + 0.95rem)",
    right: 0,
    w: "220px",
    bg: "surface",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "14px",
    boxShadow: "lg",
    p: "0.5rem",
    zIndex: 200,
  },
});

const ProfileHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    px: "0.75rem",
    py: "0.5rem",
    fontWeight: 600,
    color: "textPrimary",
  },
});

const DropdownItem = styled("button", {
  base: {
    w: "100%",
    textAlign: "left",
    px: "0.75rem",
    py: "0.5rem",
    borderRadius: "10px",
    bg: "transparent",
    border: "none",
    color: "textPrimary",
    cursor: "pointer",
    _hover: {
      bg: "rgba(255,255,255,0.08)",
    },
  },
});

const LogoutItem = styled(DropdownItem, {
  base: {
    color: "red.400",
  },
});

const Divider = styled("div", {
  base: {
    h: "1px",
    my: "0.25rem",
    bg: "border",
  },
});

const AvatarButton = styled("button", {
  base: {
    p: "0.45rem",
    borderRadius: "50%",
    border: "none",
    color: "webicon",
    overflow: "hidden",
    cursor: "pointer",
    _hover: {
      color: "#898989",
      bg: "rgba(255,255,255,0.18)",
      borderColor: "rgba(255,255,255,0.3)",
    },
  },
  
  variants: {
    scrolled: {
      true: { bg: "wiconbg" },
      false: { bg: "transparent" },
    },
  },
});