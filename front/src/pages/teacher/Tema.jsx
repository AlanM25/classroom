import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function TemaMaestro() {
  const { id_clase } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [opcion, setOpcion] = useState("");

  const [temaTitulo, setTemaTitulo] = useState("");
  const [temaDescripcion, setTemaDescripcion] = useState("");
  const [temas, setTemas] = useState([]);

  const [tareaTitulo, setTareaTitulo] = useState("");
  const [tareaInstrucciones, setTareaInstrucciones] = useState("");
  const [tareaTema, setTareaTema] = useState("");
  const [tareaFecha, setTareaFecha] = useState("");
  const [tareaCalificacion, setTareaCalificacion] = useState("");
  const [tareaArchivo, setTareaArchivo] = useState(null);

  const [materialTitulo, setMaterialTitulo] = useState("");
  const [materialDescripcion, setMaterialDescripcion] = useState("");
  const [materialTema, setMaterialTema] = useState("");
  const [materialArchivo, setMaterialArchivo] = useState(null);

  const [tareas, setTareas] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState("");

  useEffect(() => {
    fetchTemas();
  }, []);
  
  useEffect(() => {
    if (temas && temas.length > 0) {
      fetchTareas();
    }
  }, [temas]);

  const handleSeleccion = (opcionSeleccionada) => {
    setOpcion(opcionSeleccionada);
    setError(null);
  };

  const fetchTemas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/maestro/clases/${id_clase}/temas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener temas");
      }

      const data = await response.json();
      setTemas(data.length > 0 ? data : null);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTareas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/maestro/clases/temas/${temas[0]?.id}/tareas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      setTareas(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const handleSubmitTema = async (e) => {
    e.preventDefault();
    const contenido = {
      "titulo": temaTitulo,
      "descripcion": temaDescripcion,
      "clase_id": id_clase
    }
    console.log(contenido);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/maestro/temas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:
        JSON.stringify({
          contenido,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el tema");
      }

      //Actualizar la lista de temas
      fetchTemas();
      setTemaTitulo("");
      setTemaDescripcion("");
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchEntregas = async (tareaId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/maestro/tareas/${tareaId}/entregas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEntregas(data);
      setTareaSeleccionada(tareaId);
    } catch (err) {
      console.error("Error al obtener entregas:", err);
    }
  };
  
  const enviarCalificacion = async (entregaId, nota) => {
    const token = localStorage.getItem("token");
  
    await fetch(`http://127.0.0.1:8000/api/maestro/tareas-alumnos/${entregaId}/calificar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ calificacion: parseInt(nota) }),
    });
  
    fetchEntregas(tareaSeleccionada); 
  };
  
  

  const getfecha = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes() + 1).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmitTarea = (e) => {
    e.preventDefault();
    console.log("Tarea:", {
      tareaTitulo,
      tareaInstrucciones,
      tareaTema,
      tareaFecha,
      tareaCalificacion,
      tareaArchivo,
    });
  };

  const handleSubmitMaterial = (e) => {
    e.preventDefault();
    console.log("Material:", {
      materialTitulo,
      materialDescripcion,
      materialTema,
      materialArchivo,
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
              to={`/teacher/class/${id_clase}`}
              className="btn btn-outline-primary me-2 rounded-pill fw-semibold"
            >
              Inicio
            </Link>
            <Link
              to={`/teacher/class/${id_clase}/temas`}
              className="btn btn-outline-primary me-2 rounded-pill fw-semibold"
            >
              Contenido
            </Link>
          </div>

          <h1 className="fw-bold">Temas de la Clase {id_clase}</h1>
          <p>Vista Maestro</p>

          <div className="mb-4">
            <div className="btn-group">
              <button
                onClick={() => handleSeleccion("tema")}
                className="btn btn-primary"
              >
                Crear tema
              </button>
              <button
                onClick={() => handleSeleccion("tarea")}
                className="btn btn-primary"
              >
                Crear tarea
              </button>
              <button
                onClick={() => handleSeleccion("material")}
                className="btn btn-primary"
              >
                Crear material
              </button>
            </div>
          </div>

          {opcion === "tema" && (
            <div className="bg-white rounded-4 p-4 shadow-sm mb-4 w-50">
              <button
                onClick={() => setOpcion("")}
                className="btn-close"
                aria-label="Cerrar"
              ></button>
              <h5 className="fw-bold mb-3">Crear nuevo tema</h5>
              <form onSubmit={handleSubmitTema}>
                <div className="mb-3">
                  <label className="form-label">Título del tema</label>
                  <input
                    type="text"
                    className="form-control"
                    value={temaTitulo}
                    onChange={(e) => setTemaTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={temaDescripcion}
                    onChange={(e) => setTemaDescripcion(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm"
                >
                  Crear tema
                </button>{" "}
              </form>
            </div>
          )}

          {opcion === "tarea" && (
            <div className="bg-white rounded-4 p-4 shadow-sm mb-4 w-75">
              <button
                onClick={() => setOpcion("")}
                className="btn-close"
                aria-label="Cerrar"
              ></button>
              <h5 className="fw-bold mb-3">Crear nueva tarea</h5>
              <form onSubmit={handleSubmitTarea}>
                <div className="mb-3">
                  <label className="form-label">Título de la tarea</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tareaTitulo}
                    onChange={(e) => setTareaTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Instrucciones</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={tareaInstrucciones}
                    onChange={(e) => setTareaInstrucciones(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tema relacionado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tareaTema}
                    onChange={(e) => setTareaTema(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha de entrega</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={tareaFecha}
                    onChange={(e) => setTareaFecha(e.target.value)}
                    min={getfecha()}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Calificación</label>
                  <input
                    type="number"
                    className="form-control"
                    value={tareaCalificacion}
                    onChange={(e) => setTareaCalificacion(e.target.value)}
                    min={0}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subir archivo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setTareaArchivo(e.target.files[0])}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm"
                >
                  Crear tarea
                </button>
              </form>
            </div>
          )}

          {opcion === "material" && (
            <div className="bg-white rounded-4 p-4 shadow-sm mb-4 w-50">
              <button
                onClick={() => setOpcion("")}
                className="btn-close"
                aria-label="Cerrar"
              ></button>
              <h5 className="fw-bold mb-3">Crear nuevo material</h5>
              <form onSubmit={handleSubmitMaterial}>
                <div className="mb-3">
                  <label className="form-label">Título del material</label>
                  <input
                    type="text"
                    className="form-control"
                    value={materialTitulo}
                    onChange={(e) => setMaterialTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={materialDescripcion}
                    onChange={(e) => setMaterialDescripcion(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tema relacionado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={materialTema}
                    onChange={(e) => setMaterialTema(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subir archivo</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setMaterialArchivo(e.target.files[0])}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm"
                >
                  Crear material
                </button>
              </form>
            </div>
          )}

          {error && <p className="text-danger">{error}</p>}
        
        <h2 className="mt-4 fw-semibold">Lista de temas</h2>
        {error ? (
          <p className="text-danger">Error: {error}</p>
        ) : temas === null ? (
          <p className="text-secondary">Todo limpio por aquí</p>
        ) : (
          <ul className="mt-3 list-unstyled">
            {temas.map((tema, index) => (
              <li
                key={index}
                className="p-3 mb-3 border rounded shadow bg-white"
              >
                <strong>{tema.contenido}</strong>
              </li>
            ))}
          </ul>
        )}
        <h2 className="mt-4 fw-semibold">Tareas creadas</h2>
          <ul className="list-group mb-4">
            {tareas.map((t) => (
              <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                {t.titulo}
                <button
                  onClick={() => fetchEntregas(t.id)}
                  className="btn btn-sm btn-outline-success"
                >
                  Ver entregas
                </button>
              </li>
            ))}
          </ul>

          {entregas.length > 0 && (
            <div className="bg-light p-4 rounded shadow-sm">
              <h4>Entregas de la tarea #{tareaSeleccionada}</h4>
              {entregas.map((e) => (
                <div key={e.id} className="border-bottom py-2">
                  <p><strong>Alumno:</strong> {e.clase_alumno?.usuario?.nombre ?? "Sin nombre"}</p>
                  <p><strong>Estado:</strong> {e.estado}</p>
                  <p><strong>Fecha de entrega:</strong> {e.fecha_entrega}</p>
                  {e.archivos && e.archivos.length > 0 && (
                    <div>
                      <strong>Archivos:</strong>
                      <ul>
                        {e.archivos.map((a) => (
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
                  <div className="mt-2">
                    <input
                      type="number"
                      placeholder="Calificación"
                      min="0"
                      max="100"
                      defaultValue={e.calificacion ?? ""}
                      className="form-control w-25 d-inline"
                      onBlur={(ev) =>
                        enviarCalificacion(e.id, ev.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemaMaestro;
