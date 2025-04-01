import React from 'react';

const Topbar = ({ user }) => {
  const fotoPerfil = user?.foto_perfil;

  return (
    <div className="topbar">
      {fotoPerfil ? (
        <img src={fotoPerfil} alt="Perfil" className="profile-pic" />
      ) : (
        <div className="avatar-placeholder" />
      )}
    </div>
  );
};

export default Topbar;
