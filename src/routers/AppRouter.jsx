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