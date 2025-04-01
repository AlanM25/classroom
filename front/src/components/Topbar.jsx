import React from 'react';

const Topbar = ({ user }) => {
  const fotoPerfil = user?.foto_perfil;

  return (
    <div className="topbar-fixed">
      <div className="topbar-left">
      </div>
      <div className="topbar-right me-2">
        {fotoPerfil ? (
          <img src={fotoPerfil} alt="Perfil" className="profile-pic" />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
    </div>
  );
};

export default Topbar;
