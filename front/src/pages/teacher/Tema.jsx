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

  const handleSeleccion = (opcionSeleccionada) => {
    setOpcion(opcionSeleccionada);
    setError(null);
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

  const handleSubmitTema = (e) => {
    e.preventDefault();
    console.log("Tema:", { temaTitulo, temaDescripcion });
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
        </div>
      </div>
    </div>
  );
}

export default TemaMaestro;
