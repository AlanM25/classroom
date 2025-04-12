import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HouseFill, BellFill, JournalBookmarkFill } from 'react-bootstrap-icons';

const SidebarAlumno = () => {
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
          to="/student/inicio"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <HouseFill className="me-2" /> Inicio
        </NavLink>

        <NavLink
          to="/tareas-pendientes"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <JournalBookmarkFill className="me-2" /> Tareas pendientes
        </NavLink>

        <NavLink
          to="/student/class/:id_clase"
          className={({ isActive }) =>
            `text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
          }
        >
          <BellFill className="me-2" /> Avisos
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

export default SidebarAlumno;
