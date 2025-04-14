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

          <h1 className="fw-bold">{tarea.titulo}</h1>
          <p>{tarea.instrucciones}</p>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TareaMaestro;
