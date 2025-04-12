import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import AvisosAlumno from "./AvisosAlumnos";
import ContenidoAlumno from "./ContenidoAlumno";
import './layout.css';

function ClaseAlumno() {
  const { id_clase } = useParams();
  const [avisos, setAvisos] = useState([]);
  const [temas, setTemas] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [tareas, setTareas] = useState([]);
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
      fetchTemas();
    }

    fetchClases();
  }, [id_clase]);

  const fetchAvisos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener avisos");
      const data = await res.json();
      setAvisos(data.length > 0 ? data.reverse() : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTemas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/temas/${id_clase}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("No se pudieron obtener los temas");
  
      const data = await response.json();
      setTemas(data.length > 0 ? data : []);
      fetchMaterialesYtareas(data);  // 
    } catch (err) {
      console.error("Error al obtener temas:", err);
      setError("Error al obtener temas");
    }
  };
  

  const fetchMaterialesYtareas = async (temas) => {
    const token = localStorage.getItem("token");
    const materialesCompletos = [];
    const tareasCompletas = [];
  
    for (const tema of temas) {
      // Fetch materiales
      const resMat = await fetch(`http://127.0.0.1:8000/api/materiales/${tema.id}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (resMat.ok) {
        const dataMat = await resMat.json();
        materialesCompletos.push(...dataMat.map(m => ({
          ...m,
          profesor: "Profesor", // provisional
          fecha: m.fecha_creacion ?? m.created_at,
          tipo: "material"
        })));
      }
  
      // Fetch tareas
      const resTar = await fetch(`http://127.0.0.1:8000/api/tareas/${tema.id}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (resTar.ok) {
        const dataTar = await resTar.json();
        tareasCompletas.push(...dataTar.map(t => ({
          ...t,
          profesor: "Profesor", // provisional
          fecha: t.fecha_creacion ?? t.created_at,
          tipo: "tarea"
        })));
      }
    }
  
    setMateriales(materialesCompletos);
    setTareas(tareasCompletos);
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

          {activeTab === "avisos" && (
            <>
              <h4 className="mt-3 fw-semibold">Lista de avisos</h4>
              {error ? (
                <p className="text-danger">Error: {error}</p>
              ) : (
                <AvisosAlumno
                  avisos={avisos}
                  materiales={materiales}
                  tareas={tareas}
                />
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
