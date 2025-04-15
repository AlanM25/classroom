import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookFill, ClipboardCheckFill } from "react-bootstrap-icons";

function AvisosAlumno() {
  const { id_clase } = useParams();
  const navigate = useNavigate();

  const [avisos, setAvisos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvisos();
    fetchTemasConContenido();
  }, [id_clase]);

  const fetchAvisos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAvisos(data.reverse());
    } catch (err) {
      setError("Error al obtener avisos");
    }
  };

  const fetchTemasConContenido = async () => {
    try {
      const token = localStorage.getItem("token");

      const temasRes = await fetch(`http://127.0.0.1:8000/api/temas/${id_clase}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const temas = await temasRes.json();

      let allMateriales = [];
      let allTareas = [];

      for (const tema of temas) {
        const [resMat, resTar] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/maestro/temas/${tema.id}/materiales`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://127.0.0.1:8000/api/maestro/clases/temas/${tema.id}/tareas`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const mats = await resMat.json();
        const tars = await resTar.json();

        allMateriales.push(...mats.map(m => ({ ...m, profesor: tema.clase?.maestro?.nombre ?? 'Profesor' })));
        allTareas.push(...tars.map(t => ({ ...t, profesor: tema.clase?.maestro?.nombre ?? 'Profesor' })));
      }

      setMateriales(allMateriales);
      setTareas(allTareas);
    } catch (err) {
      setError("Error al obtener materiales o tareas");
    }
  };

  const listaCompleta = [
    ...avisos.map(av => ({
      tipo: "aviso",
      id: av.id,
      contenido: av.contenido,
      fecha: av.created_at,
      profesor: av.usuario?.nombre + " " + (av.usuario?.apellido ?? ""),
      archivos: av.archivos ?? [],
      foto_perfil: av.usuario?.foto_perfil,
    })),
    ...materiales.map(mat => ({
      tipo: "material",
      id: mat.id,
      titulo: mat.titulo,
      descripcion: mat.descripcion,
      archivos: mat.archivos ?? [],
      fecha: mat.fecha_creacion,
      profesor: mat.profesor ?? "Profesor",
    })),
    ...tareas.map(tar => ({
      tipo: "tarea",
      id: tar.id,
      titulo: tar.titulo,
      instrucciones: tar.instrucciones,
      fecha: tar.fecha_creacion,
      profesor: tar.profesor ?? "Profesor",
    }))
  ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <ul className="mt-3 list-unstyled">
      {listaCompleta.map((item, index) => {
        const fecha = item.fecha
          ? new Date(item.fecha).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Sin fecha";

        // Avisos
        if (item.tipo === "aviso") {
          return (
            <li key={index} className="p-3 mb-3 border rounded shadow-sm bg-warning-subtle">
              <div className="d-flex align-items-center mb-2">
                <img
                  src={item.foto_perfil ?? "https://picsum.photos/40"}
                  alt="Perfil"
                  className="rounded-circle me-3"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <strong>{item.profesor}</strong><br />
                  <small>{fecha}</small>
                </div>
              </div>
              <p className="mb-2">{item.contenido}</p>

              {item.archivos.map((archivo, i) => {
                const url = `http://127.0.0.1:8000/storage/${archivo.nombre_en_storage}`;
                const esPDF = archivo.nombre_original.toLowerCase().endsWith(".pdf");
                return (
                  <div key={i} className="mt-2">
                    <strong className="d-block mb-1">Archivo adjunto:</strong>
                    {esPDF ? (
                      <embed src={url} type="application/pdf" width="100%" height="300px" className="rounded border" />
                    ) : (
                      <img src={url} className="img-fluid rounded" alt="Archivo" style={{ maxHeight: "300px" }} />
                    )}
                  </div>
                );
              })}
            </li>
          );
        }

        // Material
        if (item.tipo === "material") {
          return (
            <li key={index} className="p-3 mb-3 border rounded shadow-sm bg-warning-subtle">
              <div className="d-flex align-items-center mb-2">
                <BookFill className="me-2" size={24} />
                <div>
                  <strong>{item.profesor}</strong><br />
                  <small>{fecha}</small>
                </div>
              </div>
              <p className="mb-1">
                El profesor <strong>{item.profesor}</strong> ha subido un nuevo material:{" "}
                <strong className="text-primary">{item.titulo}</strong>
              </p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(`/alumno/class/${id_clase}/material/${item.id}`, { state: { material: item } })}
              >
                Ver material
              </button>
            </li>
          );
        }

        // Tarea
        if (item.tipo === "tarea") {
          return (
            <li key={index} className="p-3 mb-3 border rounded shadow-sm bg-warning-subtle">
              <div className="d-flex align-items-center mb-2">
                <ClipboardCheckFill className="me-2" size={24} />
                <div>
                  <strong>{item.profesor}</strong><br />
                  <small>{fecha}</small>
                </div>
              </div>
              <p className="mb-1">
                El profesor <strong>{item.profesor}</strong> ha publicado una nueva tarea:{" "}
                <strong className="text-primary">{item.titulo}</strong>
              </p>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(`/alumno/class/${id_clase}/tarea/${item.id}`, { state: { tarea: item } })}
              >
                Ver tarea
              </button>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}

export default AvisosAlumno;
