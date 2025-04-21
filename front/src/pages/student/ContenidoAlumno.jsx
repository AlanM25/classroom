import React, { useEffect, useState } from "react";
import { Book, ClipboardCheck, FileText } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ContenidoAlumno = ({ id_clase }) => {
  const [temas, setTemas] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (id_clase) cargarTemasYContenido();
  }, [id_clase]);

  const cargarTemasYContenido = async () => {
    try {
      const token = localStorage.getItem("token");
      const rTemas = await fetch(`http://127.0.0.1:8000/api/temas/${id_clase}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const temasBase = await rTemas.json();

      const temasConContenido = await Promise.all(
        temasBase.map(async (tema) => {
          const [rMat, rTar] = await Promise.all([
            fetch(`http://127.0.0.1:8000/api/maestro/temas/${tema.id}/materiales`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`http://127.0.0.1:8000/api/maestro/clases/temas/${tema.id}/tareas`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          return {
            ...tema,
            materiales: rMat.ok ? await rMat.json() : [],
            tareas:      rTar.ok ? await rTar.json() : [],
          };
        })
      );

      setTemas(temasConContenido);
    } catch (err) {
      console.error("Error al cargar contenido:", err);
      setTemas([]);           
    }
  };

  if (temas.length === 0) {
    return <p className="text-secondary mt-4">Aún no hay temas asignados.</p>;
  }

  return (
    <div className="mt-4">
      {temas.map((tema) => (
        <div key={tema.id} className="bg-warning-subtle rounded p-4 mb-4 shadow-sm">
          <h5 className="fw-bold mb-2">
            <Book className="me-2 text-warning" />
            {tema.titulo}
          </h5>
          <p className="mb-3">{tema.descripcion}</p>

          {/* ── Materiales ───────────────── */}
          {tema.materiales.length > 0 && (
            <section className="mb-3">
              <h6 className="fw-semibold">
                <FileText className="me-2 text-info" />
                Materiales
              </h6>
              <ul className="list-unstyled">
                {tema.materiales.map((m) => (
                  <li key={m.id}>
                    <button
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() =>
                        navigate(`/alumno/class/${id_clase}/material/${m.id}`, {
                          state: { material: m },
                        })
                      }
                    >
                      {m.titulo ?? m.nombre_original ?? "Material"}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Tareas ────────────────────── */}
          {tema.tareas.length > 0 && (
            <section>
              <h6 className="fw-semibold">
                <ClipboardCheck className="me-2 text-success" />
                Tareas
              </h6>
              <ul className="list-unstyled">
                {tema.tareas.map((t) => (
                  <li key={t.id} className="mb-1">
                    <button
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() =>
                        navigate(`/alumno/class/${id_clase}/tarea/${t.id}`, {
                          state: { tarea: t },
                        })
                      }
                    >
                      {t.titulo}
                    </button>
                    <span className="text-muted ms-2">
                      (Entrega:{" "}
                      {new Date(t.fecha_limite).toLocaleDateString("es-MX")})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContenidoAlumno;
