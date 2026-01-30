// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateLayout from "../layouts/PrivateLayout";

import SoftAuthGuard from "../guards/SoftAuthGuard";
import HardAuthGuard from "../guards/HardAuthGuard";

import Home from "../pages/public/Home";
import ComoFunciona from "../pages/public/ComoFunciona";
import Ubicaciones from "../pages/public/Ubicaciones";
import Soporte from "../pages/public/Soporte";
import AcercaDe from "../pages/public/AcercaDe";
import TerminosDeUso from "../pages/public/TerminosDeUso";
import PoliticaDePrivacidad from "../pages/public/PoliticaDePrivacidad";

import Login from "../pages/public/auth/Login";
import Register from "../pages/public/auth/Register";

import Perfil from "../pages/private/profile/Perfil";

import Dashboard from "../pages/private/Dashboard";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PÚBLICAS (navbar + footer) */}
      <Route element={<SoftAuthGuard />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/ubicaciones" element={<Ubicaciones />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/terminos" element={<TerminosDeUso />} />
          <Route path="/privacidad" element={<PoliticaDePrivacidad />} />
        </Route>
      </Route>

      {/* AUTH (sin navbar ni footer) */}
      <Route element={<SoftAuthGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Route>
      </Route>

      {/* PRIVADAS (seguras) */}
      <Route element={<HardAuthGuard />}>
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />

      </Route>
      </Route>
      

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
