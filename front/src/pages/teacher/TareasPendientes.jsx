import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function TareasPendientes() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [estructura, setEstructura] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasesConTareas();
  }, []);

  const fetchClasesConTareas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/maestro/clases", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al obtener clases");
      const clases = await response.json();

      const estructuraCompleta = await Promise.all(
        clases.map(async (clase) => {
          const temas = await fetchTemas(clase.id, token);
          const temasConTareas = await Promise.all(
            temas.map(async (tema) => {
              const tareas = await fetchTareas(tema.id, token);
              return { ...tema, tareas };
            })
          );
          return { ...clase, temas: temasConTareas };
        })
      );

      setEstructura(estructuraCompleta);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTemas = async (id_clase, token) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/maestro/clases/${id_clase}/temas`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Error al obtener temas");
      return await res.json();
    } catch {
      return [];
    }
  };

  const fetchTareas = async (tema_id, token) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/maestro/clases/temas/${tema_id}/tareas`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Error al obtener tareas");
      return await res.json();
    } catch {
      return [];
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
          <h1 className="mb-4">Tareas pendientes por revisar</h1>
          {error && <p className="text-danger">Error: {error}</p>}

          {estructura.length === 0 ? (
            <p className="text-secondary">no hay clases asignadas aún</p>
          ) : (
            estructura.map((clase) => (
              <div key={clase.id} className="mb-5">
                <h2 className="fw-semibold">Clase: {clase.nombre}</h2>

                {clase.temas.length === 0 ? (
                  <p className="text-muted ms-3">no hay temas en esta clase</p>
                ) : (
                  <ul className="mt-3 list-unstyled ms-3">
                    {clase.temas.map((tema, index) => (
                      <li
                        key={index}
                        className="p-3 mb-4 border rounded shadow bg-white"
                      >
                        <h4 className="fw-bold">{tema.titulo}</h4>
                        <h6 className="text-secondary">{tema.descripcion}</h6>

                        <h5 className="mt-3">Tareas:</h5>
                        <hr />
                        <ul className="list-unstyled">
                          {tema.tareas.length === 0 ? (
                            <p className="text-muted">no hay tareas asignadas</p>
                          ) : (
                            tema.tareas.map((tarea, tareaIndex) => (
                              <li key={tareaIndex}>
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <strong>{tarea.titulo}</strong>: {tarea.instrucciones}
                                    <br />
                                    <span className="text-muted">
                                      fecha límite:{" "}
                                      {new Date(tarea.fecha_limite).toLocaleString()}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => {
                                      localStorage.setItem("tarea", JSON.stringify(tarea));
                                      navigate(
                                        `/teacher/class/${clase.id}/${tarea.id}/instrucciones`
                                      );
                                    }}
                                    className="btn btn-sm btn-outline-success ms-4"
                                  >
                                    ver entregas
                                  </button>
                                </div>
                                <hr />
                              </li>
                            ))
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default TareasPendientes;
