import React, { useState, useEffect } from "react";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import './layout.css';


function InicioAlumno() {
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); //foto de perfil

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

    fetchClases();
  }, []);


  const fetchClases = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clases-alumno");

      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }

      const data = await response.json();
      setClases(data.length > 0 ? data : null); //Si no hay clases que mejor sea nulo
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="main-layout">
      <SidebarAlumno />
      <div className="content-layout">
        <Topbar user={user} />
        <div className="main-panel p-4 rounded-3">
          <h1 className="fw-bold">Inicio</h1>
          <p>Bienvenido Alumno</p>

          <h2 className="mt-4">Lista de Clases</h2>
          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : clases === null ? (
            <p className="text-secondary">Aún no hay clases disponibles.</p>
          ) : (
            <ul className="list-unstyled">
              {clases.map((clase, index) => (
                <li key={index} className="p-3 mb-2 border rounded shadow bg-white">
                  <strong>{clase.nombre}</strong> - {clase.horario}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


export default InicioAlumno;
