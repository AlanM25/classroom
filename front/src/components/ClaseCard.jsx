import React from 'react';

const ClaseCard = ({ clase }) => {
  return (
    <div className="card shadow-sm rounded-4 p-3" style={{ width: '250px' }}>
      <h5 className="fw-bold">{clase.nombre}</h5>
      <p className="mb-1">Cuatrimestre {clase.cuatrimestre}</p>
      <div className="d-flex align-items-center mt-2">
        <img
          src={clase.foto_maestro}
          alt="maestro"
          className="rounded-circle me-2"
          width="40"
          height="40"
        />
        <div>
          <strong>{clase.nombre_maestro}</strong>
          <div style={{ fontSize: '0.85rem' }}>{clase.carrera}</div>
        </div>
      </div>
    </div>
  );
};

export default ClaseCard;
