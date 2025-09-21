// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaChevronRight,
  FaUserCog,
  FaMoneyBillWave,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
  FaRobot,
  FaBuilding,
} from "react-icons/fa"; // 👈 eliminé FaBars
import logo from "../assets/images/logo.jpg";

// ❌ eliminé toggleSidebar porque ya no se usa
const Sidebar = ({ sidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Usuario");
  const [userRole, setUserRole] = useState("Invitado");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserRole = localStorage.getItem("userRole");
    setUsername(storedUsername || "Usuario");
    setUserRole(storedUserRole || "Invitado");
  }, [location.pathname]);

  const menuItems = [
    { title: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/admin/dashboard" },
    {
      title: "Administración",
      icon: <FaUserCog />,
      key: "administracion",
      subItems: [
        { name: "Usuarios", path: "/admin/usuarios" },
        { name: "Roles", path: "/admin/roles" },
        { name: "Empleado", path: "/admin/empleados" },
        { name: "Cargos", path: "/admin/cargos" },
        { name: "Nominas", path: "/admin/nominas" },
      ],
    },
    {
      title: "Residencial",
      icon: <FaBuilding />,
      key: "residencial",
      subItems: [
        { name: "Propietario", path: "/admin/propietarios" },
        { name: "Residente", path: "/admin/residentes" },
        { name: "Visitante", path: "/admin/visitantes" },
        { name: "Vehiculo", path: "/admin/vehiculos" },
        { name: "Unidad", path: "/admin/unidades" },
        { name: "Bloque", path: "/admin/bloques" },
        { name: "Mascotas", path: "/admin/mascotas" },
        { name: "Incidentes", path: "/admin/incidentes" },
      ],
    },
    {
      title: "Finanzas",
      icon: <FaMoneyBillWave />,
      key: "finanzas",
      subItems: [
        { name: "Contrato", path: "/admin/contratos" },
        { name: "Reportes", path: "/admin/reportes" },
        { name: "Factura", path: "/admin/facturas" },
        { name: "Servicios", path: "/admin/servicios" },
        { name: "Reserva", path: "/admin/reservas" },
        { name: "Areas sociales", path: "/admin/areas-sociales" },
      ],
    },
    {
      title: "Seguridad IA",
      icon: <FaRobot />,
      key: "seguridad-ia",
      subItems: [
        { name: "Reconocimiento facial", path: "/admin/reconocimiento-facial" },
        { name: "Reconocimiento vehicular", path: "/admin/reconocimiento-vehicular" },
        { name: "Detectar problemas", path: "/admin/detectar-problemas" },
      ],
    },
  ];

  const NavItem = ({ to, icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-3 flex items-center space-x-4 rounded-lg ${
          isActive
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : "text-gray-500 group"
        }`
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );

  return (
    <aside
      className={`bg-white w-64 flex-shrink-0 h-screen flex flex-col border-r transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* 🔹 Logo centrado sin botón */}
      <div className="h-16 flex items-center justify-center px-4 border-b">
        <img src={logo} alt="logo" className="h-12 w-auto" />
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((menu) => (
          <div key={menu.key}>
            {menu.subItems ? (
              <>
                <div
                  className="px-4 py-3 flex items-center justify-between space-x-4 rounded-lg text-gray-500 group cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleMenu(menu.key)}
                >
                  <div className="flex items-center space-x-4">
                    {menu.icon}
                    <span>{menu.title}</span>
                  </div>
                  {openMenu === menu.key ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </div>
                {openMenu === menu.key && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {menu.subItems.map((sub, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block p-2 rounded-md ${
                              isActive
                                ? "text-sky-600 bg-gray-100"
                                : "text-gray-500 hover:bg-gray-100"
                            }`
                          }
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavItem to={menu.path} icon={menu.icon}>
                {menu.title}
              </NavItem>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-2xl text-gray-500 mr-3" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 truncate">
              {username}
            </span>
            <span className="text-xs text-gray-400 capitalize">{userRole}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group w-full hover:bg-gray-100"
        >
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
