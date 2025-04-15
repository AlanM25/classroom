import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import "./layout.css";

function TemaMaestro() {
  const { id_clase } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [opcion, setOpcion] = useState("");
  const [clase, setClase] = useState(""); //La clase

  const [temaTitulo, setTemaTitulo] = useState("");
  const [temaDescripcion, setTemaDescripcion] = useState("");
  const [temas, setTemas] = useState([]);

  const [tareaTitulo, setTareaTitulo] = useState("");
  const [tareaInstrucciones, setTareaInstrucciones] = useState("");
  const [tareaTema, setTareaTema] = useState("");
  const [tareaFecha, setTareaFecha] = useState("");
  const [tareaArchivo, setTareaArchivo] = useState(null);
  const [tareasTemas, setTareasTemas] = useState([]);

  const [materialTitulo, setMaterialTitulo] = useState("");
  const [materialDescripcion, setMaterialDescripcion] = useState("");
  const [materialTema, setMaterialTema] = useState("");
  const [materialArchivo, setMaterialArchivo] = useState(null);
  const [materialesTemas, setMaterialesTemas] = useState([]);

  useEffect(() => {
    fetchTemas();
    const claseEntera = JSON.parse(localStorage.getItem("clase"));
    setClase(claseEntera);
  }, []);

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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener temas");
      }

      const data = await response.json();
      setTemas(data.length > 0 ? data : null);

      if (data.length > 0) {
        const allTareas = [];
        for (let tema of data) {
          const tareas = await fetchTareas(tema.id);
          allTareas.push(...tareas);
        }
        setTareasTemas(allTareas);

        const allMateriales = [];
        for (let tema of data) {
          const materiales = await fetchMateriales(tema.id);
          allMateriales.push(...materiales);
        }
        setMaterialesTemas(allMateriales);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTareas = async (tema_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/maestro/clases/temas/${tema_id}/tareas`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener temas");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const fetchMateriales = async (tema_id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/maestro/temas/${tema_id}/materiales`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener temas");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const handleSubmitTema = async (e) => {
    e.preventDefault();
    const contenido = {
      titulo: temaTitulo,
      descripcion: temaDescripcion,
      clase_id: id_clase,
    };
    console.log(contenido);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/maestro/temas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contenido),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el tema");
      } else {
        //Actualizar la lista de temas
        alert("Tema creado con exito");
        fetchTemas();
        setTemaTitulo("");
        setTemaDescripcion("");
        setOpcion("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitTarea = async (e) => {
    e.preventDefault();
    const contenido = {
      titulo: tareaTitulo,
      instrucciones: tareaInstrucciones,
      fecha_limite: tareaFecha,
      tema_id: tareaTema,
      archivo: tareaArchivo,
      clase_id: id_clase,
    };
    console.log(contenido);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/maestro/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contenido),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el tema");
      } else {
        //Actualizar la lista de tareas
        alert("Tarea creada con exito");
        fetchTemas();
        setTareaArchivo("");
        setTareaFecha("");
        setTareaInstrucciones("");
        setTareaTema("");
        setTareaTitulo("");
        setOpcion("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitMaterial = async (e) => {
    e.preventDefault();
    const contenido = {
      titulo: materialTitulo,
      descripcion: materialDescripcion,
      /* archivos: materialArchivo, tal vez esto no jala*/
      tema_id: materialTema,
    };
    console.log(contenido);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/maestro/materiales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contenido),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar el material");
      } else {
        //Actualizar la lista de materiales
        alert("Material creado con exito");
        setMaterialTitulo("");
        setMaterialDescripcion("");
        setMaterialTema("");
        setMaterialArchivo("");
        setOpcion("");
        fetchTemas();
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
      setTareaSeleccionada(tareaId);
    } catch (err) {
      console.error("Error al obtener entregas:", err);
    }
  };

  const getfecha = () => {
    const now = new Date();
    now.setSeconds(0, 0);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
              className="btn btn-outline-warning me-2 rounded-pill fw-semibold"
            >
              Inicio
            </Link>
            <Link
              to={`/teacher/class/${id_clase}/temas`}
              className="btn btn-warning me-2 rounded-pill fw-semibold"
            >
              Contenido
            </Link>
          </div>

          <h1 className="fw-bold">Temas dentro de {clase.nombre}</h1>

          <div className="mb-4">
            <div className="btn-group">
              <button
                onClick={() => handleSeleccion("tema")}
                className="btn btn-warning fw-bold m-1 rounded"
              >
                Crear tema
              </button>
              <button
                onClick={() => handleSeleccion("tarea")}
                className="btn btn-warning fw-bold m-1 rounded"
                disabled={!temas || temas.length === 0}
              >
                Crear tarea
              </button>
              <button
                onClick={() => handleSeleccion("material")}
                className="btn btn-warning fw-bold m-1 rounded"
                disabled={!temas || temas.length === 0}
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
                  <select
                    className="bg-white text-dark"
                    required
                    disabled={!temas || temas.length === 0}
                    onChange={(e) => setTareaTema(e.target.value)}
                  >
                    <option value="">Selecciona un tema</option>
                    {temas.map((tema) => (
                      <option key={tema.id} value={tema.id}>
                        {tema.titulo}
                      </option>
                    ))}
                  </select>
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
                  <select
                    className="bg-white text-dark"
                    required
                    disabled={!temas || temas.length === 0}
                    onChange={(e) => setMaterialTema(e.target.value)}
                  >
                    <option value="">Selecciona un tema</option>
                    {temas.map((tema) => (
                      <option key={tema.id} value={tema.id}>
                        {tema.titulo}
                      </option>
                    ))}
                  </select>
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
            <p className="text-secondary">No se han creado temas</p>
          ) : (
            <ul className="mt-3 list-unstyled">
              {temas.map((tema, index) => (
                <li
                  key={index}
                  className="p-3 mb-3 border rounded shadow bg-white"
                >
                  <h1>
                    <strong>{tema.titulo}</strong>
                  </h1>
                  <h4>{tema.descripcion}</h4>

                  <h5>Tareas:</h5>
                  <hr />
                  <ul className="list-unstyled">
                    {tareasTemas
                      .filter((tarea) => tarea.tema_id === tema.id)
                      .map((tarea, tareaIndex) => (
                        <li key={tareaIndex}>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong>{tarea.titulo}</strong>:{" "}
                              {tarea.instrucciones}
                              <br />
                              Fecha de límite:{" "}
                              {new Date(tarea.fecha_limite).toLocaleString()}
                            </div>

                            <button
                              onClick={() => {
                                localStorage.setItem(
                                  "tarea",
                                  JSON.stringify(tarea)
                                );
                                navigate(
                                  `/teacher/class/${id_clase}/${tarea.id}/instrucciones`
                                );
                              }}
                              /* onClick={() => fetchEntregas(tarea.id)} */
                              className="btn btn-sm btn-outline-success ms-4"
                            >
                              Ver entregas
                            </button>
                          </div>
                          <hr />
                        </li>
                      ))}
                  </ul>

                  <h5>Materiales:</h5>
                  <hr />
                  <ul>
                    {materialesTemas
                      .filter((material) => material.tema_id === tema.id)
                      .map((material, materialIndex) => (
                        <li key={materialIndex}>
                          <strong>{material.titulo}</strong>:{" "}
                          {material.descripcion}
                          <hr />
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TemaMaestro;
