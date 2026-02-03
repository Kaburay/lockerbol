// src/components/layout/AppSidebar.jsx
import { useState, useEffect, useRef } from "react";
import useAuth from "../../auth/auth.store";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, styled } from "../../../styled-system/jsx";
import logoFull from "../../assets/logo_lock.svg";
import logoMini from "/Lockerbol.svg";

import { 
    SidebarSimpleIcon, 
    HouseIcon, 
    UserIcon, 
    BoxArrowDownIcon, 
    ClockCounterClockwiseIcon, 
    SignOutIcon,
    GearIcon
} from "@phosphor-icons/react";

const Sidebar = styled("aside", {
  base: {
    bg: "surface",
    borderRight: "1px solid",
    borderColor: "border",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    transition: "width 0.2s ease",
  },
  variants: {
    collapsed: {
      true: { width: "55px", padding: "1rem 0.5rem" },
      false: { width: "200px", padding: "0.5rem" },
    },
},
});

const Header = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
  },
  variants: {
    collapsed: {
      true: {
        justifyContent: "center",
        
      },
        false: {pe: "0.5rem",},
    },
  },
});

const LogoButton = styled("button", {
  base: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: "textPrimary",
  },
});

const LogoBox = styled("div", {
  base: {
    width: "100%",
    height: "40px",          // altura fija
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});


const Logo = styled("img", {
  base: {
    height: "100%",
    transition: "opacity 0.15s ease",
  },
});

const ExpandIcon = styled("div", {
  base: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.15s ease",
  },
});

const RetractIcon = styled("button", {
  base: {
    background: "none",
    color: "textPrimary",
  },
});

const LogoWrapper = styled("div", {
  base: {
    position: "relative",
    _hover: {
      "& .expand-icon": {
        opacity: 1,
      },
      "& .logo-img": {
        opacity: 0,
      },
    },
  },
});


const Nav = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
});

const Link = styled(NavLink, {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.6rem 0.75rem",
    borderRadius: "14px",
    color: "textSecondary",
    fontSize: "sm",
    textDecoration: "none",
    whiteSpace: "nowrap",
    _hover: {
      bg: "background",
      color: "textPrimary",
    },
    "&.active": {
      bg: "primary",
      color: "onPrimary",
    },
  },
  variants: {
    collapsed: {
      true: {
        justifyContent: "center",
        padding: "0.4rem",
      },
    },
  },
});

const Label = styled("span", {
  variants: {
    collapsed: {
      true: { display: "none" },
    },
  },
});

const Bottom = styled("div", {
  base: {
    marginTop: "auto",
  },
});

const UserButton = styled("button", {
  base: {
    type: "button",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    w: "100%",
    p: "0.6rem",
    borderRadius: "12px",
    bg: "transparent",
    border: "none",
    cursor: "pointer",
    color: "textPrimary",
    _hover: {
      bg: "background",
    },
  },
});


const UserInfo = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    lineHeight: 1.2,
  },
});

const UserName = styled("span", {
  base: {
    fontSize: "sm",
    fontWeight: 600,
    maxW: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});


const UserEmail = styled("span", {
  base: {
    fontSize: "xs",
    color: "textSecondary",
    maxW: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const ProfileDropdown = styled("div", {
  base: {
    position: "absolute",
    zIndex: 1000,
    bg: "surface",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "14px",
    boxShadow: "lg",
    w: "185px",
    p: "0.4rem",
  },
});

const DropdownItem = styled("button", {
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textAlign: "left",
    padding: "0.5rem 0.75rem",
    bg: "transparent",
    fontSize: "sm",
    border: "none",
    cursor: "pointer",
    color: "textPrimary",
    borderRadius: "10px",
    _hover: {
      bg: "background",
    },
  },
});


const Divider = styled("div", {
  base: {
    height: "1px",
    my: "0.5rem",
    mx: "1rem",
    bg: "divider",
  },
});

const LogoutItem = styled(DropdownItem, {
  base: {
    color: "textPrimary",
  },
});






export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        }
    }

    if (open) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [open]);


  return (
    <Sidebar collapsed={collapsed}>
      <Header collapsed={collapsed}>
        <LogoButton onClick={() => collapsed && setCollapsed(false)}>
          <LogoWrapper>
            <LogoBox>
              <Logo
                className="logo-img"
                src={collapsed ? logoMini : logoFull}
                alt="LockerBol"
              />
              {collapsed && (
                <ExpandIcon className="expand-icon">
                  <SidebarSimpleIcon size={20} />
                </ExpandIcon>
              )}
            </LogoBox>
          </LogoWrapper>
        </LogoButton>

        {!collapsed && (
          <RetractIcon onClick={() => setCollapsed(true)}>
            <SidebarSimpleIcon size={20} />
          </RetractIcon>
        )}
      </Header>

      <Nav>
        <Link to="/dashboard" collapsed={collapsed}>
        {({ isActive }) => (
            <>
            <HouseIcon
                size={20}
                weight={isActive ? "fill" : "regular"}
            />
            <Label collapsed={collapsed}>Inicio</Label>
            </>
        )}
        </Link>

        <Link  to="/depositar" collapsed={collapsed}>
        {({ isActive }) => (
            <>
            <BoxArrowDownIcon size={20} weight={isActive ? "fill" : "regular"} />
            <Label collapsed={collapsed}>Depositar</Label>
            </>
        )}
        </Link>

        <Link  to="/historial" collapsed={collapsed}>
        {({ isActive }) => (
        <>
           <ClockCounterClockwiseIcon size={20} weight={isActive ? "fill" : "regular"} />
          <Label collapsed={collapsed}>Historial</Label>
        </>
        )}
       
        </Link>
      </Nav>

      <Bottom>
        <Box position="relative" ref={dropdownRef}>
            <UserButton
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(v => !v);
            }}
            >
            <UserIcon size={20} weight="bold" />
            {!collapsed && (
                <UserInfo>
                <UserName>{user?.username}</UserName>
                </UserInfo>
            )}
            </UserButton>

            {open && (
            <ProfileDropdown style={
      collapsed
        ? { left: "60px", bottom: "0" }
        : { left: 0, bottom: "110%" }
    }>
                <DropdownItem onClick={() => navigate("/perfil")}>
                <UserInfo> 
                    <UserName>{user?.username}</UserName>
                    <UserEmail>{user?.email}</UserEmail>
                </UserInfo> 
                
                </DropdownItem>

                <DropdownItem>
                <GearIcon size={16} />
                Configuración
                </DropdownItem>

                <Divider />

                <LogoutItem onClick={logout}>
                <SignOutIcon size={16} />
                Cerrar sesión
                </LogoutItem>
            </ProfileDropdown>
            )}
        </Box>
        </Bottom>

    </Sidebar>
  );
}