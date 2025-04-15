import React, { useEffect, useState } from "react";
import { Book, ClipboardCheck, FileText } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ContenidoAlumno = ({ id_clase }) => {
  const [temas, setTemas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemasYContenido();
  }, [id_clase]);

  const fetchTemasYContenido = async () => {
    try {
      const token = localStorage.getItem("token");
      const resTemas = await fetch(`http://127.0.0.1:8000/api/temas/${id_clase}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const temas = await resTemas.json();
      const temasConContenido = await Promise.all(
        temas.map(async (tema) => {
          const [matRes, tarRes] = await Promise.all([
            fetch(`http://127.0.0.1:8000/api/maestro/temas/${tema.id}/materiales`, {
              headers: { Authorization: `Bearer ${token}` }
            }),
            fetch(`http://127.0.0.1:8000/api/maestro/clases/temas/${tema.id}/tareas`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);

          const materiales = matRes.ok ? await matRes.json() : [];
          const tareas = tarRes.ok ? await tarRes.json() : [];

          return {
            ...tema,
            materiales,
            tareas,
          };
        })
      );

      setTemas(temasConContenido);
    } catch (error) {
      console.error("Error al cargar contenido:", error);
    }
  };

  return (
    <div className="mt-4">
      {temas.length === 0 ? (
        <p className="text-secondary">Aún no hay temas asignados.</p>
      ) : (
        temas.map((tema, index) => (
          <div key={index} className="bg-warning-subtle rounded p-4 mb-4 shadow-sm">
            <h5 className="fw-bold mb-2">
              <Book className="me-2 text-warning" />
              {tema.titulo}
            </h5>
            <p className="mb-3">{tema.descripcion}</p>

            {tema.materiales.length > 0 && (
              <div className="mb-3">
                <h6 className="fw-semibold">
                  <FileText className="me-2 text-info" />
                  Materiales
                </h6>
                <ul className="list-unstyled">
                  {tema.materiales.map((material) => (
                    <li key={material.id}>
                      <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() =>
                          navigate(`/alumno/class/${id_clase}/material/${material.id}`, {
                            state: { material }
                          })
                        }
                      >
                        {material.titulo}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tema.tareas.length > 0 && (
              <div>
                <h6 className="fw-semibold">
                  <ClipboardCheck className="me-2 text-success" />
                  Tareas
                </h6>
                <ul className="list-unstyled">
                  {tema.tareas.map((tarea) => (
                    <li key={tarea.id}>
                      <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() =>
                          navigate(`/alumno/class/${id_clase}/tarea/${tarea.id}`, {
                            state: { tarea }
                          })
                        }
                      >
                        {tarea.titulo}
                      </button>
                      <span className="text-muted ms-2">
                        (Entrega: {new Date(tarea.fecha_limite).toLocaleDateString("es-MX")})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ContenidoAlumno;
