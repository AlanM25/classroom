import React from 'react';
import { NavLink } from 'react-router-dom';
import { HouseFill, BellFill, CollectionFill } from 'react-bootstrap-icons';

const SidebarAlumno = () => {
  return (
    <div className="bg-warning-subtle vh-100 d-flex flex-column p-3" style={{ width: '200px' }}>
      <h4 className="fw-bold mb-4">UPV</h4>
      <NavLink to="/inicio" className="mb-3 text-decoration-none text-dark fw-semibold">
        <HouseFill className="me-2" /> Inicio
      </NavLink>
      <NavLink to="/tareas" className="mb-3 text-decoration-none text-dark fw-semibold">
        <CollectionFill className="me-2" /> Tareas pendientes
      </NavLink>
      <NavLink to="/avisos" className="text-decoration-none text-dark fw-semibold">
        <BellFill className="me-2" /> Avisos
      </NavLink>
    </div>
  );
};

export default SidebarAlumno;
