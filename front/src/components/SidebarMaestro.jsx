import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseFill, ClipboardCheck, PlusSquare } from 'react-bootstrap-icons';

const SidebarMaestro = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <h4 className="fw-bold mb-4">UPV</h4>
      
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
        to="/teacher/crear-clase"
        className={({ isActive }) =>
          `text-decoration-none fw-semibold d-flex align-items-center ${isActive ? 'text-warning fw-bold' : 'text-dark'}`
        }
      >
        <PlusSquare className="me-2" /> Crear clase
      </NavLink>
    </div>
  );
};

export default SidebarMaestro;
