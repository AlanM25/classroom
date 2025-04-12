import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseFill, BellFill, JournalBookmarkFill } from 'react-bootstrap-icons';

const SidebarAlumno = () => {
  return (
    <div className="sidebar d-flex flex-column">
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
  );
};

export default SidebarAlumno;
