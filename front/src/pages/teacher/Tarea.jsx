import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function TareaMaestro() {
  const { id_clase } = useParams();
  const { id_tarea } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [tarea, setTarea] = useState(JSON.parse(localStorage.getItem("tarea")));

  console.log();

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarMaestro />
      </div>

      <div style={{ marginLeft: "200px", width: "100%" }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5">
          <div className="d-flex justify-content-start mb-4">
            <Link
              to={`/teacher/class/${id_clase}/${id_tarea}/instrucciones`}
              className="btn btn-outline-primary me-2 rounded-pill fw-semibold"
            >
              Instrucciones
            </Link>
            <Link
              to={`/teacher/class/${id_clase}/${id_tarea}/revisiones`}
              className="btn btn-outline-primary me-2 rounded-pill fw-semibold"
            >
              Trabajo de los alumnos
            </Link>
          </div>

          <div className="bg-white rounded-4 p-4 shadow-sm mb-4 w-100">
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="fw-bold">{tarea.titulo}</h1>
              </div>
              <div className="d-flex align-items-center">
                <p>
                  <b>Fecha de entrega: </b> {tarea.fecha_limite}
                </p>
              </div>
            </div>
            <p>{tarea.instrucciones}</p>
            {tarea.archivos && tarea.archivos.length > 0 && (
              <div>
                <strong>Archivos:</strong>
                <ul>
                  {tarea.archivos.map((a) => (
                    <li key={a.id}>
                      <a
                        href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {a.nombre_original}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TareaMaestro;
