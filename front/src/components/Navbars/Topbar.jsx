import React from 'react';

const Topbar = ({ user }) => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
      <h5 className="m-0 fw-bold">UPV</h5>
      <div>
        {user?.foto_perfil ? (
          <img
            src={user.foto_perfil}
            alt="perfil"
            className="rounded-circle"
            width="40"
            height="40"
          />
        ) : (
          <div
            className="rounded-circle bg-secondary"
            style={{ width: '40px', height: '40px' }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
