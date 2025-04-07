import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import './layout.css';


function ClaseAlumno() {
  const { id_clase } = useParams(); //Agarramos el id
  const [avisos, setAvisos] = useState([]); //Lista de avisos que existen
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); //perfil

  //Buscar avisos según el id
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

    if (id_clase) {
      fetchAvisos();
    }
  }, [id_clase]);

  const fetchAvisos = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener avisos");
      }

      const data = await response.json();
      setAvisos(data.length > 0 ? data : null);
    } catch (err) {
      setError(err.message);
    }
  };

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
          <h1 className="fw-bold">Clase {id_clase}</h1>
          <p>Vista alumno</p>

          <h2 className="fw-semibold mt-4">Lista de avisos</h2>
          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : avisos === null ? (
            <p className="text-secondary">Todo limpio por aquí</p>
          ) : (
            <ul className="list-unstyled mt-3">
              {avisos.map((aviso, index) => (
                <li key={index} className="p-3 mb-3 border rounded shadow bg-white">
                  <strong>{aviso.contenido}</strong>

                  {/* Mostrar archivos si existen */}
                  {aviso.archivos && aviso.archivos.length > 0 && (
                    <div className="mt-2">
                      <p className="fw-bold mb-1">Archivos adjuntos:</p>
                      <ul>
                        {aviso.archivos.map((archivo, i) => (
                          <li key={i}>
                            <a
                              href={`http://127.0.0.1:8000/storage/${archivo.nombre_en_storage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              {archivo.nombre_original}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


export default ClaseAlumno;
