import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  return (
    <div tabIndex="-1">
      <div className="header">
        <h5 className="title">
          Clases
        </h5>
      </div>

      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/inicio" className="text-decoration-none">
              <i className="bi bi-house-door me-2"></i> Inicio
            </Link>
          </li>

          {classes && classes.length > 0 ? (
            classes.map((clase) => (
              <li key={clase.id} className="list-group-item">
                <Link
                  to={`/clase/${clase.id}`}
                  className="text-decoration-none"
                >
                  {clase.nombre}
                </Link>
              </li>
            ))
          ) : (
            <li className="list-group-item">No hay clases</li>
          )}
        </ul>
      </div>
    </div>
  );
}
