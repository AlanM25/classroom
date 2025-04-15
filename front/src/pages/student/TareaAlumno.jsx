import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import { openDB } from "idb";

function TareaAlumno() {
  const { id_clase, id_tarea } = useParams();
  const location = useLocation();
  const tareaProp = location.state?.tarea;

  const [user, setUser] = useState(null);
  const [tarea, setTarea] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [status, setStatus] = useState("Pendiente");

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (usuario) setUser(JSON.parse(usuario));

    if (tareaProp) {
      setTarea(tareaProp);
    } else {
      fetchTareaCompleta();
    }

    cargarArchivoDesdeIndexDB();
  }, []);

  const fetchTareaCompleta = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tareas/show/${id_tarea}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Error al obtener tarea.");
        return;
      }

      const data = await res.json();
      setTarea(data);
    } catch (err) {
      console.error("Error al cargar tarea:", err);
    }
  };

  const cargarArchivoDesdeIndexDB = async () => {
    const db = await openDB("TareasDB", 1, {
      upgrade(db) {
        db.createObjectStore("archivos");
      },
    });
    const savedFile = await db.get("archivos", `tarea_${id_tarea}`);
    if (savedFile) setArchivo(savedFile);
  };

  const guardarArchivoEnIndexDB = async (file) => {
    const db = await openDB("TareasDB", 1, {
      upgrade(db) {
        db.createObjectStore("archivos");
      },
    });
    await db.put("archivos", file, `tarea_${id_tarea}`);
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
    guardarArchivoEnIndexDB(file);
  };

  const handleEntregar = async () => {
    const token = localStorage.getItem("token");
    const alumnoClaseId = localStorage.getItem("alumno_clase_id");

    if (!archivo || !alumnoClaseId) {
      alert("⚠️ Debes seleccionar un archivo y tener un ID válido.");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("alumno_clase", alumnoClaseId);

    try {
        const res = await fetch(`http://127.0.0.1:8000/api/alumno/tareas/${id_tarea}/entregar`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
          });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error al entregar tarea:", text);
        alert("❌ Error al entregar tarea.");
        return;
      }

      alert("✅ Tarea entregada correctamente.");
      setStatus("Entregado");
    } catch (err) {
      console.error("Error al entregar:", err);
      alert("❌ No se pudo entregar la tarea.");
    }
  };

  const fechaFormateada = tarea?.fecha_limite
    ? new Date(tarea.fecha_limite).toLocaleDateString("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Sin fecha";

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarAlumno />
      </div>
      <div style={{ marginLeft: "200px", width: "100%" }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5 d-flex justify-content-between flex-wrap">
          {/* Panel Izquierdo */}
          <div className="bg-white rounded-4 p-4 shadow-sm mb-4" style={{ flex: 1, marginRight: "30px" }}>
            <h1 className="fw-bold">{tarea?.titulo ?? "Sin título"}</h1>
            <p className="text-muted mb-1"><strong>Fecha de entrega:</strong> {fechaFormateada}</p>
            <p className="text-muted"><strong>Profesor:</strong> {tarea?.profesor ?? "Profesor"}</p>
            <p>{tarea?.instrucciones}</p>

            {tarea?.archivos?.length > 0 && (
              <div className="mt-3">
                <strong className="d-block">Archivos adjuntos:</strong>
                <ul>
                  {tarea.archivos.map((a) => (
                    <li key={a.id}>
                      <a href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`} target="_blank" rel="noreferrer">
                        {a.nombre_original}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Panel Derecho */}
          <div className="bg-white rounded-4 p-4 shadow-sm mb-4" style={{ width: "300px" }}>
            <h5 className="fw-bold">Tu trabajo <span className="text-warning float-end">{status}</span></h5>
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleArchivoChange}
            />
            {archivo && (
              <div className="mt-2 small text-success">
                Archivo seleccionado: <strong>{archivo.name}</strong>
              </div>
            )}
            <button
              onClick={handleEntregar}
              className="btn btn-warning w-100 mt-3 fw-bold"
            >
              Marcar como completado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TareaAlumno;
