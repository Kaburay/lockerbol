// src/pages/private/Deposit/DepositDetails.jsx
import { useEffect, useState } from "react";
import { styled } from "../../../../styled-system/jsx";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Stepper from "../../../components/ui/Stepper";
import AppInput from "../../../components/ui/Appinput";
import MultilineInput from "../../../components/ui/MultilineInput";
import TimeLimitSegmented from "../../../components/ui/TimeLimitSegmented";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import AlertModal from "../../../components/ui/AlertModal";

const API_URL = "http://192.168.1.3:3000";

/* ---------------- styled ---------------- */

const Container = styled("div", {
  base: {
    paddingX: "16px",
    paddingBottom: "24px",
    minHeight: "100%",
  },
});

const Card = styled("div", {
  base: {
    padding: "16px",
    borderRadius: "20px",
    marginY: "12px",
    bg: "surface",
  },
});

const CardTitle = styled("h2", {
  base: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "4px",
    color: "textPrimary",
  },
});

const TextSecondary = styled("p", {
  base: {
    color: "textSecondary",
    fontSize: "14px",
  },
});

const InputGroup = styled("div", {
  base: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

const Label = styled("label", {
  base: {
    fontSize: "16px",
    marginBottom: "4px",
    color: "textPrimary",
  },
});

/* ---------------- screen ---------------- */

export default function DepositDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { lockerId, compartimento } = location.state || {};

  const [lockerNombre, setLockerNombre] = useState(null);
  const [nombrePaquete, setNombrePaquete] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedHours, setSelectedHours] = useState(null);
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("Error");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const timeOptions = [
    { label: "12 h", hours: 12 },
    { label: "24 h", hours: 24 },
    { label: "2 días", hours: 48 },
  ];

  /* -------- guard web -------- */

  useEffect(() => {
    if (!lockerId || !compartimento) {
      navigate("/depositar", { replace: true });
    }
  }, [lockerId, compartimento, navigate]);

  /* -------- obtener locker -------- */

  useEffect(() => {
    if (!lockerId) return;

    const fetchLocker = async () => {
      try {
        const snap = await getDoc(doc(db, "lockers", lockerId));
        if (snap.exists()) {
          setLockerNombre(snap.data().nombre);
        }
      } catch {
        showAlert(
          "Error",
          "No se pudo cargar la información del locker."
        );
      }
    };

    fetchLocker();
  }, [lockerId]);

  /* -------- guardar -------- */

  const handleGuardar = async () => {
    if (loading) return;

    const user = getAuth().currentUser;
    if (!user) {
      showAlert("Error", "Usuario no autenticado.");
      return;
    }

    if (!nombrePaquete || !selectedHours) {
      showAlert(
        "Datos incompletos",
        "Completa el nombre del paquete y el tiempo límite."
      );
      return;
    }

    try {
      setLoading(true);

      await axios.get(`${API_URL}/ping`, { timeout: 5000 });

      const payload = {
        lockerId,
        compartimentoId: compartimento.id,
        numeroCompartimento: compartimento.numero,
        nombrePaquete,
        descripcion,
        duracionHoras: selectedHours,
        usuarioId: user.uid,
      };

      const res = await axios.post(
        `${API_URL}/api/paquetes/crear`,
        payload
      );

      if (!res.data?.success) throw new Error();

      navigate("/deposit/success", {
        replace: true,
        state: { id: res.data.idPaquete },
      });
    } catch (err) {
      const status = err?.response?.status;

      if (status === 409) {
        showAlert(
          "Compartimento no disponible",
          "Este compartimento ya no está disponible."
        );
        return;
      }

      if (status === 400) {
        showAlert(
          "Datos inválidos",
          "Revisa la información enviada."
        );
        return;
      }

      if (status === 500) {
        showAlert(
          "Error del servidor",
          "Intenta nuevamente en unos segundos."
        );
        return;
      }

      showAlert(
        "Error de conexión",
        "No se pudo completar el depósito."
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------- render -------- */

  return (
    <>
      <Container>
        <Stepper currentStep={3} totalSteps={3} />

        <Card>
          <CardTitle>
            Compartimento C{compartimento?.numero}
          </CardTitle>

          {lockerNombre && (
            <TextSecondary>
              Locker: {lockerNombre}
            </TextSecondary>
          )}

          <TextSecondary>
            Dimensiones: {compartimento?.dimensiones}
          </TextSecondary>
        </Card>

        <InputGroup>
          <Label>Nombre del paquete *</Label>
          <AppInput
  placeholder="Ej: Documentos, Zapatos…"
  value={nombrePaquete}
  onChange={setNombrePaquete}
/>

          <Label>Descripción (opcional)</Label>
          <MultilineInput
            placeholder="Detalle del paquete"
            value={descripcion}
            onChange={setDescripcion}
          />

          <Label>Tiempo límite para retiro *</Label>
          <TimeLimitSegmented
            options={timeOptions}
            selectedHours={selectedHours}
            onSelect={setSelectedHours}
          />

          {selectedHours && (
            <TextSecondary>
              Se liberará el{" "}
              {new Date(
                Date.now() + selectedHours * 3600000
              ).toLocaleString()}
            </TextSecondary>
          )}
        </InputGroup>

        <PrimaryButton
          title={loading ? "Procesando…" : "Finalizar"}
          onPress={handleGuardar}
          disabled={loading}
        />
      </Container>

      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        type="error"
        onClose={() => setAlertVisible(false)}
      />
    </>
  );
}
