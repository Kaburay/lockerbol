// src/components/ui/LockerRenderer.jsx
import { useEffect, useRef, useState } from "react";
import { styled } from "../../../styled-system/jsx";

const COLUMN_GAP = 2;
const ROW_GAP = 2;

// --------------------
// Styled components
// --------------------

const Frame = styled("div", {
  base: {
    position: "relative",
    border: "1px solid",
    borderColor: "gray.400",
    borderRadius: "12px",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
});

const Compartment = styled("button", {
  base: {
    position: "absolute",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    _hover: {
      opacity: 0.9,
    },
  },
});

// --------------------
// Component
// --------------------

export default function LockerRenderer({
  columnas,
  compartimentos,
  onSelect,
}) {
  const frameRef = useRef(null);
  const [frameWidth, setFrameWidth] = useState(0);

  // 🔹 ancho visual del locker
  const lockerWidth =
    columnas === 1 ? "20%" :
    columnas === 2 ? "40%" :
    columnas === 3 ? "60%" :
    columnas === 4 ? "80%" : "100%";

  // 🔹 total de unidades verticales
  const totalUnits = Math.max(
    ...compartimentos.map(
      (c) => (c.fila_inicio - 1) + c.height_units
    ),
    0
  );

  // 🔹 ancho de columna real
  const columnWidth =
    frameWidth > 0
      ? (frameWidth - COLUMN_GAP * (columnas - 1)) / columnas
      : 0;

  const unitHeight = columnWidth / 4;
  const totalGaps = totalUnits > 0 ? (totalUnits - 1) * ROW_GAP : 0;
  const lockerHeight = (totalUnits * unitHeight) + totalGaps;

  // --------------------
  // Resize observer
  // --------------------

  useEffect(() => {
    if (!frameRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setFrameWidth(entry.contentRect.width);
    });

    observer.observe(frameRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Frame
      ref={frameRef}
      style={{
        width: lockerWidth,
        height: lockerHeight,
      }}
    >
      {frameWidth > 0 &&
        compartimentos.map((c) => {
          const indexFila = c.fila_inicio - 1;
          const bottom =
            (indexFila * unitHeight) + (indexFila * ROW_GAP);

          const left =
            (c.columna - 1) * (columnWidth + COLUMN_GAP);

          const height =
            (c.height_units * unitHeight) +
            ((c.height_units - 1) * ROW_GAP);

          return (
            <Compartment
              key={c.id}
              disabled={!c.disponible}
              onClick={() => onSelect(c)}
              style={{
                width: columnWidth,
                height,
                bottom,
                left,
                background: c.disponible
                  ? "var(--colors-primary)"
                  : "var(--colors-gray)",
              }}
            >
              C{c.numero}
            </Compartment>
          );
        })}
    </Frame>
  );
}
