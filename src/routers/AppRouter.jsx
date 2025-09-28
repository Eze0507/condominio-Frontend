import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/login/LoginPage.jsx";
import Layout from "../components/Layout.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import Usuarios from "../pages/usuario/UserPage.jsx";
import Roles from "../pages/rol/RolPage.jsx";
import Empleados from "../pages/empleados/EmpleadoPage.jsx";
import Cargos from "../pages/cargos/CargoPage.jsx";
import Propietarios from "../pages/propietarios/PropietarioPage.jsx";
import Inquilinos from "../pages/inquilinos/InquilinoPage.jsx";
import Familiares from "../pages/familiares/FamiliarPage.jsx";
import Visitantes from "../pages/visitantes/VisitantePage.jsx";
import Mascotas from "../pages/mascotas/MascotaPage.jsx";
import Visitas from "../pages/visitas/VisitaPage.jsx";
import Vehiculos from "../pages/vehiculos/VehiculoPage.jsx";
import Bloques from "../pages/bloques/BloquePage.jsx";
import Unidades from "../pages/unidades/UnidadPage.jsx";
import ReconocimientoVehicular from "../pages/reconocimiento/ReconocimientoPage.jsx";




// Componente para proteger rutas
const ProtectedRoute = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  return isLoggedIn ? <Layout /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para la homepage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Ruta pública para el login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas del panel de administración */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="roles" element={<Roles />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="cargos" element={<Cargos />} />
          <Route path="propietarios" element={<Propietarios />} />
          <Route path="inquilinos" element={<Inquilinos />} />
          <Route path="familiares" element={<Familiares />} />
          <Route path="visitantes" element={<Visitantes />} />
          <Route path="mascotas" element={<Mascotas />} />
          <Route path="visitas" element={<Visitas />} />
          <Route path="vehiculos" element={<Vehiculos />} />
          <Route path="bloques" element={<Bloques />} />
          <Route path="unidades" element={<Unidades />} />
          <Route path="reconocimiento-vehicular" element={<ReconocimientoVehicular />} />
        </Route>

        {/* Redirección por defecto */}
        <Route 
          path="*" 
          element={<Navigate to={localStorage.getItem("access") ? "/admin/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;