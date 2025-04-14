import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function RevisionesMaestro() {
  const { id_clase } = useParams();
  const { id_tarea } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [tarea, setTarea] = useState(JSON.parse(localStorage.getItem("tarea")));
  const [entregas, setEntregas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");

  console.log();

  const fetchEntregas = async (tareaId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/maestro/tareas/${tareaId}/entregas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setEntregas(data);
      setTareaSeleccionada(tareaId);
    } catch (err) {
      console.error("Error al obtener entregas:", err);
    }
  };

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
              to={`/teacher/class/${id_clase}/${id_tarea}/revision`}
              className="btn btn-outline-primary me-2 rounded-pill fw-semibold"
            >
              Trabajo de los alumnos
            </Link>
          </div>

          <h1 className="fw-bold">{tarea.titulo}</h1>
          <p>{tarea.instrucciones}</p>

          <div>
            {entregas.length > 0 && (
              <div className="bg-light p-4 rounded shadow-sm">
                <h4>Entregas de la tarea #{tareaSeleccionada}</h4>
                {entregas.map((e) => (
                  <div key={e.id} className="border-bottom py-2">
                    <p>
                      <strong>Alumno:</strong>{" "}
                      {e.clase_alumno?.alumno?.nombre ?? "Sin nombre"}
                    </p>
                    <p>
                      <strong>Estado:</strong> {e.estado}
                    </p>
                    <p>
                      <strong>Fecha de entrega:</strong> {e.fecha_entrega}
                    </p>
                    {e.archivos && e.archivos.length > 0 && (
                      <div>
                        <strong>Archivos:</strong>
                        <ul>
                          {e.archivos.map((a) => (
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
                    <div className="mt-2">
                      <input
                        type="number"
                        placeholder="Calificación"
                        min="0"
                        max="100"
                        defaultValue={e.calificacion ?? ""}
                        className="form-control w-25 d-inline"
                        onBlur={(ev) =>
                          enviarCalificacion(e.id, ev.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevisionesMaestro;
