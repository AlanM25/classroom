import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HouseFill, ClipboardCheck, PlusSquare } from 'react-bootstrap-icons';

const SidebarMaestro = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/"); 
      } else {
        alert("Error al cerrar sesión.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("No se pudo cerrar sesión.");
    }
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between vh-100">
      <div>
        <h4 className="fw-bold mb-3">UPV</h4>

        <NavLink
          to="/teacher/inicio"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <HouseFill className="me-2" /> Inicio
        </NavLink>

        <NavLink
          to="/teacher/tareas-calificar"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <ClipboardCheck className="me-2" /> Calificar tareas
        </NavLink>

        <NavLink
          to="/teacher/class/:id_clase"
          className={({ isActive }) =>
            `text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <PlusSquare className="me-2" /> Pendiente...
        </NavLink>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="btn btn-warning fw-bold rounded-3 shadow-sm w-100"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SidebarMaestro;
