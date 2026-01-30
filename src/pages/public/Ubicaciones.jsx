// src/pages/Ubicaciones.jsx
import { useState } from "react";
import { styled } from "../../../styled-system/jsx";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPinIcon } from "@phosphor-icons/react";

// Ejemplo de lockers (más adelante reemplazar con datos de Firebase)
const lockers = [
  {
    id: "locker1",
    name: "Locker Central",
    lat: -16.500,
    lng: -68.150,
    address: "Av. Central #123",
    available: true,
  },
  {
    id: "locker2",
    name: "Locker Norte",
    lat: -16.490,
    lng: -68.130,
    address: "Calle Norte #45",
    available: false,
  },
  {
    id: "locker3",
    name: "Locker Sur",
    lat: -16.510,
    lng: -68.160,
    address: "Av. Sur #78",
    available: true,
  },
];

export default function Ubicaciones() {
  const [selectedLocker, setSelectedLocker] = useState(null);

  return (
    <LocationsContainer>
      {/* HEADER */}
      <Header>
        <h1>Ubicaciones de lockers</h1>
        <p>
          Encuentra el locker más cercano y verifica disponibilidad de tus
          paquetes.
        </p>
      </Header>

      {/* MAP */}
      <MapWrapper>
        <Map
          initialViewState={{
            longitude: -68.150,
            latitude: -16.500,
            zoom: 12,
          }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          style={{ width: "100%", height: "100%" }}
        >
          {lockers.map((locker) => (
            <Marker
              key={locker.id}
              longitude={locker.lng}
              latitude={locker.lat}
              anchor="bottom"
            >
              <PinButton
                available={locker.available}
                onClick={() => setSelectedLocker(locker)}
              >
                <MapPinIcon size={28} weight="fill" />
              </PinButton>
            </Marker>
          ))}

          {selectedLocker && (
            <Popup
              longitude={selectedLocker.lng}
              latitude={selectedLocker.lat}
              anchor="top"
              closeOnClick={true}
              onClose={() => setSelectedLocker(null)}
            >
              <PopupContent>
                <h3>{selectedLocker.name}</h3>
                <p>{selectedLocker.address}</p>
                <Status available={selectedLocker.available}>
                  {selectedLocker.available ? "Disponible" : "Ocupado"}
                </Status>
              </PopupContent>
            </Popup>
          )}
        </Map>
      </MapWrapper>
    </LocationsContainer>
  );
}

/* ================= STYLES ================= */

const LocationsContainer = styled("section", {
  base: {
    minH: "100vh",
    bg: "background",
    color: "textPrimary",
    display: "flex",
    flexDirection: "column",
    py: { base: "4rem", md: "6rem" },
    px: { base: "1.5rem", md: "2rem" },
  },
});

const Header = styled("div", {
  base: {
    textAlign: "center",
    mb: "2.5rem",
    "& h1": {
      fontSize: { base: "2rem", md: "2.6rem" },
      fontWeight: 800,
      mb: "0.75rem",
    },
    "& p": {
      color: "textSecondary",
      fontSize: "1rem",
      maxW: "600px",
      mx: "auto",
      lineHeight: 1.6,
    },
  },
});

const MapWrapper = styled("div", {
  base: {
    flex: 1,
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    minH: { base: "400px", md: "600px" },
  },
});

// Pin personalizado
const PinButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    borderRadius: "50%",
    w: "48px",
    h: "48px",
    transition: "transform 0.2s",
    _hover: { transform: "scale(1.1)" },
  },
  variants: {
    available: {
      true: { bg: "primary", color: "onPrimary" },
      false: { bg: "textSecondary", color: "background" },
    },
  },
});

const PopupContent = styled("div", {
  base: {
    maxW: "200px",
    "& h3": {
      fontWeight: 700,
      fontSize: "1.05rem",
      mb: "0.25rem",
    },
    "& p": {
      color: "textSecondary",
      fontSize: "0.9rem",
      mb: "0.5rem",
    },
  },
});

const Status = styled("span", {
  base: {
    fontWeight: 600,
    px: "0.5rem",
    py: "0.25rem",
    borderRadius: "8px",
    fontSize: "0.75rem",
  },
  variants: {
    available: {
      true: { bg: "primary", color: "onPrimary" },
      false: { bg: "textMuted", color: "background" },
    },
  },
});
