import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";   
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar        from "../../components/Topbar";
import "./layout.css";

export default function MaterialAlumno() {
  const { id_clase, id_material } = useParams();
  const { state }   = useLocation();
  const navigate    = useNavigate();              
  const [user, setUser]    = useState(null);
  const [material, setMat] = useState(state?.material ?? null);
  const [load, setLoad]    = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    if (!material || !material.archivos?.length) fetchMaterial();
  }, [id_material]);

  const fetchMaterial = async () => {
    try {
      setLoad(true);
      const r = await fetch(`http://127.0.0.1:8000/api/materiales/${id_material}`, {
        headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` },
      });
      if (!r.ok) throw new Error("404");
      setMat(await r.json());
    } catch (e) {
      console.error(e);
      setMat(null);
    } finally { setLoad(false); }
  };

  const volver = () => {
    if (window.history.length > 2) {
      navigate(-1);                              
    } else {
      navigate(`/alumno/clase/${id_clase}`);     
    }
  };

  if (load || !material) return <p className="text-center mt-5">Cargando…</p>;

  return (
    <div className="main-layout">
      <div className="sidebar-fixed"><SidebarAlumno/></div>
      <div style={{marginLeft:200,width:"calc(100% - 200px)"}}>
        <div className="topbar-fixed"><Topbar user={user}/></div>

        <div className="main-panel p-5">
          <div className="d-flex justify-content-between mb-4">
            <h2 className="fw-bold">{material.titulo}</h2>

            {/* botón volver */}
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              onClick={volver}
            >
              Volver
            </button>
          </div>

          {material.descripcion && <p><strong>Descripción:</strong> {material.descripcion}</p>}
          {material.fecha_creacion && (
            <p><strong>Fecha de creación:</strong>{" "}
              {new Date(material.fecha_creacion).toLocaleDateString("es-MX")}
            </p>
          )}

          <h5 className="mt-4">Archivos:</h5>
          {material.archivos?.length ? (
            <ul>
              {material.archivos.map(a=>(
                <li key={a.id}>
                  <a href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`} target="_blank" rel="noopener noreferrer">
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
