
import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate }      from "react-router-dom";
import SidebarAlumno  from "../../components/SidebarAlumno";
import Topbar         from "../../components/Topbar";
import { openDB }     from "idb";
import "./layout.css";


export default function TareaAlumno() {
  const { id_tarea } = useParams();           
  const { state }    = useLocation();
  const navigate     = useNavigate();                                    // ← hook


  const [user,     setUser]     = useState(null);
  const [tarea,    setTarea]    = useState(state?.tarea || null);
  const [archivo,  setArchivo]  = useState(null);        // archivo local a subir
  const [entrega,  setEntrega]  = useState(null);        
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => { fetchTarea(); }, [id_tarea]);

  const fetchTarea = async () => {
    setLoading(true);
    try {
      const r = await fetch(`http://127.0.0.1:8000/api/tareas/show/${id_tarea}`,
        { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } });
      if (!r.ok) throw new Error();
      setTarea(await r.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchEntrega(); }, [id_tarea]);

  const fetchEntrega = async () => {
    const alumnoClase = localStorage.getItem("alumno_clase_id");
    if (!alumnoClase) return;

    try {
      const r = await fetch(
        `http://127.0.0.1:8000/api/alumno/tareas/${id_tarea}/mi-entrega?alumno_clase=${alumnoClase}`,
        { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } }
      );
      if (r.status === 204) { setEntrega(null); return; }
      if (!r.ok) throw new Error();
      setEntrega(await r.json());
    } catch { /* sin registro */ }
  };

  /* ─────────  indexedDB  ───────── */
  useEffect(() => { loadLocal(); }, [id_tarea]);

  const loadLocal = async () => {
    const db = await openDB("TareasDB", 1,
                { upgrade: db => db.createObjectStore("archivos") });
    const f  = await db.get("archivos", `tarea_${id_tarea}`);
    if (f) setArchivo(f);
  };
  const saveLocal = async f => {
    const db = await openDB("TareasDB", 1,
                { upgrade: db => db.createObjectStore("archivos") });
    await db.put("archivos", f, `tarea_${id_tarea}`);
  };

  const onSelect = e => {
    const f = e.target.files[0];
    if (!f) return;
    setArchivo(f);
    saveLocal(f);
  };

  const enviar = async () => {
    const alumnoClase = localStorage.getItem("alumno_clase_id");
    if (!archivo)     return alert("Selecciona un archivo");
    if (!alumnoClase) return alert(" No se encontró tu clase ");

    const fd = new FormData();
    fd.append("archivo",       archivo);
    fd.append("alumno_clase",  alumnoClase);

    try {
      const r = await fetch(
        `http://127.0.0.1:8000/api/alumno/tareas/${id_tarea}/entregar`,
        { method:"POST",
          headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` },
          body:fd }
      );
      if (!r.ok) throw new Error(await r.text());
      alert(" Tarea entregada");
      await fetchEntrega();           // refrescamos estado
    } catch (e) { alert(` ${e.message}`); }
  };

  const cancelar = async () => {
    const alumnoClase = localStorage.getItem("alumno_clase_id");
    if (!window.confirm("¿Quitar la entrega?")) return;

    try {
      const r = await fetch(
        `http://127.0.0.1:8000/api/alumno/tareas/${id_tarea}/entrega`,
        {
          method :"DELETE",
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify({ alumno_clase: alumnoClase })
        }
      );
      if (!r.ok) throw new Error(await r.text());
      alert("Entrega cancelada");
      setEntrega(null);
      setArchivo(null);
      saveLocal(null);
    } catch (e) { alert(` ${e.message}`); }
  };



  const volver = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else if (tarea?.clase_id) {
      navigate(`/alumno/clase/${tarea.clase_id}`);
    } else {
      navigate("/alumno");
    }
  };

  if (loading || !tarea)
    return <p className="text-center mt-5">Cargando…</p>;

  const fLim  = new Date(tarea.fecha_limite  ).toLocaleDateString("es-MX");
  const fCrea = new Date(tarea.fecha_creacion).toLocaleDateString("es-MX");

  return (
    <div className="main-layout">
      <div className="sidebar-fixed"><SidebarAlumno/></div>

      <div style={{marginLeft:200,width:"calc(100% - 200px)"}}>
        <div className="topbar-fixed"><Topbar user={user}/></div>

        <div className="main-panel p-5 d-flex flex-wrap justify-content-between">
        <div className="w-100 d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold m-0">{tarea.titulo}</h2>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              onClick={volver}
            >
              Volver
            </button>
          </div>

          {/* ─────  Información de la tarea  ───── */}
          <article className="bg-white rounded-4 p-4 shadow-sm mb-4"
                   style={{flex:1,marginRight:30}}>
            <h1 className="fw-bold">{tarea.titulo}</h1>
            <p><b>Profesor:</b> {tarea.profesor}</p>
            <p><b>Publicación:</b> {fCrea}</p>
            <p><b>Límite:</b> {fLim}</p>
            <p>{tarea.instrucciones}</p>

            {!!tarea.archivos?.length && (
              <>
                <h6>Archivos del profesor:</h6>
                <ul>
                  {tarea.archivos.map(a=>(
                    <li key={a.id}>
                      <a href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`}
                         target="_blank" rel="noreferrer">
                        {a.nombre_original}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>

          {/* ─────  Panel de entrega  ───── */}
          <aside className="bg-white rounded-4 p-4 shadow-sm mb-4" style={{width:320}}>
            <h5 className="fw-bold">
              Tu trabajo
              <span className="float-end text-warning">
                {entrega?.estado ?? "pendiente"}
              </span>
            </h5>

            {/*  CALIFICADA  */}
            {entrega?.estado === "calificado" && (
              <>
                <p className="mt-3 mb-0">
                  <b>Calificación:</b> {entrega.calificacion}/100
                </p>
                <button className="btn btn-secondary w-100 fw-bold mt-3" disabled>
                  Entrega cerrada
                </button>
              </>
            )}

            {/*  ENTREGADA  */}
            {entrega?.estado === "entregado" && (
              <>
                <p className="small mt-3">
                  Archivo:&nbsp;
                  <b>{entrega.archivos?.[0]?.nombre_original ?? "—"}</b>
                </p>
                <button className="btn btn-danger w-100 fw-bold mt-2"
                        onClick={cancelar}>
                  Cancelar entrega
                </button>
              </>
            )}

            {/*  PENDIENTE  */}
            {!entrega && (
              <>
                <input type="file" className="form-control mt-3"
                       onChange={onSelect}/>
                {archivo &&
                  <p className="small mt-2">Archivo: <b>{archivo.name}</b></p>}
                <button className="btn btn-warning w-100 fw-bold mt-2"
                        onClick={enviar}>
                  Marcar como completado
                </button>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
