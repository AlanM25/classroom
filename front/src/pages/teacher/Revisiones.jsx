import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function RevisionesMaestro() {
  const { id_clase } = useParams();
  const { id_tarea } = useParams();

  const [user, setUser] = useState(null);
  const [tarea, setTarea] = useState(JSON.parse(localStorage.getItem("tarea")));
  const [entregas, setEntregas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");
  const [calificacion, setCalificacion] = useState();

  useEffect(() => {
    fetchEntregas(id_tarea);
  }, []);

  const fetchEntregas = async (tareaId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/maestro/tareas/${tareaId}/entregas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setEntregas(data);
      return data;
    } catch (err) {
      console.error("Error al obtener entregas:", err);
    }
  };

  const enviarCalificacion = async (e, entregaId, nota) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://127.0.0.1:8000/api/maestro/tareas-alumnos/${entregaId}/calificar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ calificacion: parseInt(nota) }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al calificar alumno");
    }
    
    alert("Alumno calificado exitosamente");

    fetchEntregas(id_tarea).then((data) => {
      const entregaActualizada = data.find((e) => e.id === entregaId);
      if (entregaActualizada) {
        setTareaSeleccionada(entregaActualizada);
      }
    });
  };

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarMaestro />
      </div>

      <div style={{ marginLeft: "200px", width: "100%" }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5">
          <div className="d-flex justify-content-start mb-4">
            <Link
              to={`/teacher/class/${id_clase}/${id_tarea}/instrucciones`}
              className="btn btn-outline-warning me-2 rounded-pill fw-bold"
            >
              Instrucciones
            </Link>
            <Link
              to={`/teacher/class/${id_clase}/${id_tarea}/revisiones`}
              className="btn btn-warning me-2 rounded-pill fw-bold"
            >
              Trabajo de los alumnos
            </Link>
          </div>

          <div className="bg-white rounded-4 p-4 shadow-sm mb-4 w-100">
            <div className="d-flex justify-content-between">
              <div>
                <h1 className="fw-bold">{tarea.titulo}</h1>
              </div>
              <div className="d-flex align-items-center">
                <p>
                  <b>Fecha de entrega: </b> {tarea.fecha_limite}
                </p>
              </div>
            </div>

            <div className="my-4 w-100 d-flex gap-4">
              {/* Entregas, solo los nombres de los alumnos que entregaron */}
              <div className="w-25 border-end pe-3">
                <h2>Entregas</h2>
                {entregas.map((e) => (
                  <div
                    key={e.id}
                    className="py-2 cursor-pointer"
                    onClick={() => setTareaSeleccionada(e)}
                  >
                    <div className="btn btn-warning rounded-4 p-2 shadow-sm w-100">
                      <strong>
                        {e.clase_alumno?.alumno?.nombre ?? "Sin nombre"}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-50 ps-3">
                {tareaSeleccionada ? (
                  <div>
                    <h4>Detalles de entrega</h4>
                    <p>
                      <strong>Alumno:</strong>{" "}
                      {tareaSeleccionada.clase_alumno?.alumno?.nombre ??
                        "Sin nombre"}
                    </p>
                    <p>
                      <strong>Estado:</strong> {tareaSeleccionada.estado}
                    </p>
                    <p>
                      <strong>Fecha de entrega:</strong>{" "}
                      {tareaSeleccionada.fecha_entrega}
                    </p>

                    {tareaSeleccionada.archivos?.length > 0 && (
                      <div>
                        <strong>Archivos:</strong>
                        <ul>
                          {tareaSeleccionada.archivos.map((a) => (
                            <li key={a.id}>
                              <a
                                href={`http://127.0.0.1:8000/storage/${a.nombre_en_storage}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {a.nombre_original}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-3">
                      <form
                        onSubmit={(e) =>
                          enviarCalificacion(
                            e,
                            tareaSeleccionada.id,
                            calificacion
                          )
                        }
                      >
                        <input
                          type="number"
                          placeholder="Calificación"
                          min="0"
                          max="100"
                          value={
                            tareaSeleccionada.calificacion != null
                              ? tareaSeleccionada.calificacion
                              : calificacion ?? ""
                          }
                          onChange={(e) => setCalificacion(e.target.value)}
                          className="form-control w-50 d-inline"
                          disabled={tareaSeleccionada.estado === "calificado"}
                          required
                        />
                        <button
                          type="submit"
                          className={`btn ms-2 ${
                            tareaSeleccionada.estado === "calificado"
                              ? "btn-secondary"
                              : "btn-warning font-weight-bold"
                          }`}
                          disabled={tareaSeleccionada.estado === "calificado"}
                        >
                          {tareaSeleccionada.estado === "calificado"
                            ? "Ya calificada"
                            : "Calificar"}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <p>Selecciona una entrega para ver los detalles.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevisionesMaestro;
