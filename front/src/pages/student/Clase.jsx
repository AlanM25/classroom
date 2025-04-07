import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import ContenidoAlumno from "./ContenidoAlumno";
import './layout.css';

function ClaseAlumno() {
  const { id_clase } = useParams();
  const [avisos, setAvisos] = useState([]);
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("avisos");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

    if (id_clase) {
      fetchAvisos();
    }

    fetchClases();
  }, [id_clase]);

  const fetchAvisos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener avisos");

      const data = await response.json();
      setAvisos(data.length > 0 ? data.reverse() : null);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchClases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/alumno/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(response.status);

      const data = await response.json();
      setClases(data.length > 0 ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const claseActual = clases.find((c) => c.id == id_clase);

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarAlumno />
      </div>

      <div style={{ marginLeft: '200px', width: '100%' }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5">
          <h1 className="fw-bold mb-4">{claseActual ? claseActual.nombre : "Clase"}</h1>

          {/* Pestañas */}
          <div className="d-flex justify-content-center mt-3 mb-4">
            <button
              onClick={() => setActiveTab("avisos")}
              className={`btn me-2 rounded-pill px-4 ${activeTab === "avisos" ? "btn-warning text-dark fw-bold" : "btn-light text-muted"}`}
            >
              Avisos
            </button>
            <button
              onClick={() => setActiveTab("contenido")}
              className={`btn rounded-pill px-4 ${activeTab === "contenido" ? "btn-warning text-dark fw-bold" : "btn-light text-muted"}`}
            >
              Contenido
            </button>
          </div>

          {/* Contenido dinámico */}
          {activeTab === "avisos" && (
            <>
              <h4 className="mt-3 fw-semibold">Lista de avisos</h4>
              {error ? (
                <p className="text-danger">Error: {error}</p>
              ) : avisos === null ? (
                <p className="text-secondary">Todo limpio por aquí</p>
              ) : (
                <ul className="mt-3 list-unstyled">
                  {avisos.map((aviso, index) => {
                    const usuario = aviso.usuario ?? {};
                    const nombreProfesor = `${usuario.nombre ?? 'Profesor'} ${usuario.apellido ?? ''}`;
                    const fecha = aviso.created_at
                      ? new Date(aviso.created_at).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Sin fecha";

                    const tieneMaterial = aviso.archivos && aviso.archivos.length > 0;
                    const archivo = tieneMaterial ? aviso.archivos[0] : null;

                    return (
                      <li key={index} className="p-3 mb-3 border rounded shadow-sm bg-warning-subtle">
                        <div className="d-flex align-items-center mb-2">
                          <img
                            src={usuario.foto_perfil ?? "https://picsum.photos/40"}
                            alt="Perfil"
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                          <div>
                            <strong>{nombreProfesor}</strong><br />
                            <small>{fecha}</small>
                          </div>
                        </div>

                        {tieneMaterial ? (
                          <>
                            <p>
                              El profesor <strong>{nombreProfesor}</strong> ha subido un nuevo material:{" "}
                              <strong className="text-primary">{archivo.nombre_original}</strong>
                            </p>
                            <a
                              href={`http://127.0.0.1:8000/storage/${archivo.nombre_en_storage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-dark btn-sm"
                            >
                              Ver material
                            </a>
                          </>
                        ) : (
                          <p className="mb-0">{aviso.contenido}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}

          {activeTab === "contenido" && (
            <ContenidoAlumno id_clase={id_clase} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ClaseAlumno;
