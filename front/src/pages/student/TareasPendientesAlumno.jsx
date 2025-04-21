import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar        from "../../components/Topbar";
import "./layout.css";

export default function TareasPendientesAlumno() {
  const [user,   setUser]   = useState(null);
  const [tareas, setTareas] = useState(null);
  const [load,   setLoad]   = useState(false);
  const navigate            = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => { fetchPendientes(); }, []);

  const fetchPendientes = async () => {
    setLoad(true);
    try {
      const r = await fetch("http://127.0.0.1:8000/api/alumno/tareas-pendientes",
        { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } });
      if (!r.ok) throw new Error();
      setTareas(await r.json());
    } catch { setTareas([]); }
    finally { setLoad(false); }
  };

  const verTarea = (t) => {
    navigate(`/alumno/class/${t.clase_id}/tarea/${t.id}`, { state:{ tarea:t } });
  };

  if (load || tareas === null)
    return <p className="text-center mt-5">Cargando…</p>;

  return (
    <div className="main-layout">
      <div className="sidebar-fixed"><SidebarAlumno/></div>

      <div style={{marginLeft:200,width:"calc(100% - 200px)"}}>
        <div className="topbar-fixed"><Topbar user={user}/></div>

        <div className="main-panel p-5">
          <h2 className="fw-bold mb-4">Tareas pendientes</h2>

          {tareas.length === 0 ? (
            <p>No tienes tareas pendientes </p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Clase</th>
                    <th>Tarea</th>
                    <th>Fecha límite</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map(t => (
                    <tr key={t.id}>
                      <td>{t.clase_nombre}</td>
                      <td>{t.titulo}</td>
                      <td>{new Date(t.fecha_limite)
                            .toLocaleDateString("es-MX")}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => verTarea(t)}
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
