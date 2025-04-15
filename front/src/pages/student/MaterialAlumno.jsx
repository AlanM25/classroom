import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import "./layout.css";

function MaterialAlumno() {
  const { id_clase } = useParams();
  const location = useLocation();
  const material = location.state?.material;

  if (!material) {
    return <div className="text-center mt-5">Material no encontrado</div>;
  }

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarAlumno />
      </div>
      <div style={{ marginLeft: "200px", width: "100%" }}>
        <div className="topbar-fixed">
          <Topbar />
        </div>

        <div className="main-panel p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">{material.titulo}</h2>
            <Link
              to={`/alumno/class/${id_clase}`}
              className="btn btn-outline-primary rounded-pill"
            >
              Volver a clase
            </Link>
          </div>

          <p className="mb-3"><strong>Descripción:</strong> {material.descripcion}</p>
          <p className="mb-3">
            <strong>Fecha de creación:</strong>{" "}
            {new Date(material.fecha).toLocaleDateString("es-MX")}
          </p>

          <h5>Archivos:</h5>
          {material.archivos && material.archivos.length > 0 ? (
            <ul>
              {material.archivos.map((a, i) => (
                <li key={i}>
                  <a
                    href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.nombre_original}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay archivos adjuntos.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MaterialAlumno;
