
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
    if (usuarioGuardado) setUser(JSON.parse(usuarioGuardado));
    if (id_clase) {
      fetchClases();
      fetchAvisos();
      fetchTemas();
    }
  }, [id_clase]);

  const fetchClases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/alumno/", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setClases(data);

      const clase = data.find(c => c.id == id_clase);
      if (clase && clase.pivot?.id) {
        localStorage.setItem("alumno_clase_id", clase.pivot.id);
      }
    } catch (err) {
      setError("Error al obtener clases");
    }
  };

  const fetchAvisos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener avisos");
      const data = await res.json();
      setAvisos(data.reverse());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTemas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/temas/${id_clase}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();
      setTemas(data);
      fetchMaterialesYtareas(data);
    } catch (err) {
      setError("Error al obtener temas");
    }
  };

  const fetchMaterialesYtareas = async (temas) => {
    const token = localStorage.getItem("token");
    const materialesCompletos = [];
    const tareasCompletas = [];

    for (const tema of temas) {
      const resMat = await fetch(`http://127.0.0.1:8000/api/maestro/temas/${tema.id}/materiales`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resTar = await fetch(`http://127.0.0.1:8000/api/maestro/clases/temas/${tema.id}/tareas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resMat.ok) {
        const mats = await resMat.json();
        materialesCompletos.push(...mats.map(m => ({ ...m, tipo: "material" })));
      }

      if (resTar.ok) {
        const tars = await resTar.json();
        tareasCompletas.push(...tars.map(t => ({ ...t, tipo: "tarea" })));
      }
    }

    setMateriales(materialesCompletos);
    setTareas(tareasCompletas);
  };

  const claseActual = clases.find((c) => c.id == id_clase);

  return (
    <div className="main-layout">
      <div className="sidebar-fixed"><SidebarAlumno /></div>
      <div style={{ marginLeft: '200px', width: '100%' }}>
        <div className="topbar-fixed"><Topbar user={user} /></div>

        <div className="main-panel p-5">
          <h1 className="fw-bold mb-4">{claseActual?.nombre ?? "Clase"}</h1>

          <div className="d-flex justify-content-center mt-3 mb-4">
            <button onClick={() => setActiveTab("avisos")} className={`btn me-2 rounded-pill px-4 ${activeTab === "avisos" ? "btn-warning" : "btn-light"}`}>
              Avisos
            </button>
            <button onClick={() => setActiveTab("contenido")} className={`btn rounded-pill px-4 ${activeTab === "contenido" ? "btn-warning" : "btn-light"}`}>
              Contenido
            </button>
          </div>

          {activeTab === "avisos" && (
            <AvisosAlumno
              avisos={avisos}
              materiales={materiales}
              tareas={tareas}
            />
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