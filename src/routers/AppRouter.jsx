import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/login/loginPage.jsx";
import Layout from "../components/Layout.jsx";
import Dashboard from "../pages/dashboard/dashboard.jsx";
import Usuarios from "../pages/usuario/UserPage.jsx";
import Roles from "../pages/rol/RolPage.jsx";

// Componente para proteger rutas
const ProtectedRoute = () => {
  const isLoggedIn = !!localStorage.getItem("access");
  return isLoggedIn ? <Layout /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas del panel de administración */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="roles" element={<Roles />} />
          {/* Aquí puedes añadir más rutas del panel, por ejemplo: */}
          {/* <Route path="usuarios" element={<Usuarios />} /> */}
        </Route>

        {/* Redirección por defecto */}
        <Route 
          path="*" 
          element={<Navigate to={localStorage.getItem("access") ? "/admin/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;