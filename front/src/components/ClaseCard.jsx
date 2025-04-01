import React from 'react';

const ClaseCard = ({ nombre, cuatrimestre, maestro, onClick }) => {
  return (
    <div
      className="clase-card p-4 rounded-4 shadow-sm"
      style={{
        backgroundColor: '#ffeda5',
        width: '300px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onClick={onClick}
    >
      <h5 className="fw-bold">{nombre}</h5>
      <p className="text-muted mb-2">Cuatrimestre {cuatrimestre}</p>

      {maestro?.foto_perfil ? (
        <img src={maestro.foto_perfil} alt="maestro" className="clase-avatar mx-auto mb-2" />
      ) : (
        <div className="clase-avatar bg-secondary mx-auto mb-2" />
      )}

      <p className="mb-0 fw-semibold">{maestro?.nombre} {maestro?.apellido}</p>
      <small className="text-muted">Ingeniería en Tecnologías de la Información</small>
    </div>
  );
};

export default ClaseCard;
