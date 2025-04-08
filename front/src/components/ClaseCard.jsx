import React from 'react';

const ClaseCard = ({ nombre, cuatrimestre, maestro, onClick }) => {
const fotoPerfil = "https://picsum.photos/40";
 
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
      <h4 className="fw-bold text-center">{nombre}</h4>
      <p className="text-center mb-2">Cuatrimestre {cuatrimestre}</p>
     
      {maestro?.foto_perfil ? (
        <img src={maestro.foto_perfil} alt="maestro" className="clase-avatar mx-auto mb-2" />
      ) : (
        <img src={fotoPerfil} alt="maestro" className="clase-avatar mx-auto d-block mb-2 " />
      )}

      <p className="mb-0 fw-semibold text-center">{maestro?.nombre} {maestro?.apellido}</p>
      <p className="text-center fw-bold">Ingeniería en Tecnologías de la Información</p>
    </div>
  );
};

export default ClaseCard;
