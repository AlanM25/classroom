import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ClassCard({ clase }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{clase.nombre}</h5>
        <p className="card-text">
          Maestro: {clase.maestro} <br />
        </p>
        <Link
          to={`/clase/${clase.id}`}
          className="btn btn-primary mt-2 align-self-start"
        >
          Ir a la clase
        </Link>
      </div>
    </div>
  );
}
