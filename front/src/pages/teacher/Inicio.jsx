import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from "../../components/Topbar";
import ClaseCard from "../../components/ClaseCard";
import "./layout.css";

//PRUEBA--------------------------------------------------
/* const clasesDummy = [
  {
    id: 1,
    nombre: "Matemáticas I",
    cuatrimestre: 5,
    descripcion: "Álgebra y funciones",
    carrera: { nombre: "Ingeniería en Tecnologías de la Información" },
    maestro: {
      nombre: "Erick",
      apellido: "Mata Vera",
      foto_perfil: "https://randomuser.me/api/portraits/men/21.jpg",
    },
  },
  {
    id: 2,
    nombre: "Desarrollo Web",
    cuatrimestre: 6,
    descripcion: "HTML, CSS y JS",
    carrera: { nombre: "Ingeniería en Tecnologías de la Información" },
    maestro: {
      nombre: "Alejandra",
      apellido: "Zúñiga López",
      foto_perfil: "https://randomuser.me/api/portraits/women/31.jpg",
    },
  },
]; */

//------------------_BORRAR_-----------------------------------------

function InicioMaestro() {
  const [mostrarForm, setMostrarForm] = useState(false);
  //Los datos que ocupa para crear la clase

  const [clases, setClases] = useState([]);
  const [nombreClase, setNombreClase] = useState("");
  const [descripcionClase, setDescripcionClase] = useState("");
  const [cuatrimestreClase, setCuatrimestreClase] = useState("");
  const [codigo_clase, setCodigoClase] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(""); // foto perfil
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
      console.log(usuarioGuardado);
    }

    fetchClases();
  }, []);

  //Llama a la api que crea la clase
  const handleCreateClass = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    const datos = {
      nombre: nombreClase,
      descripcion: descripcionClase,
      cuatrimestre: cuatrimestreClase,
      codigo_clase: codigo_clase,
      carrera_id: 1,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/maestro/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nombreClase,
          descripcion: descripcionClase,
          cuatrimestre: cuatrimestreClase,
          codigo_clase: codigo_clase,
        }),
      });

      const respuesta = await response.json();

      if (response.ok) {
        fetchClases();
      } else {
        alert(`Error: ${respuesta.message}`);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al enviar los datos:", err);
      alert("Hubo un error al conectar con el servidor.");
    }

    setMostrarForm(false);
  };

  const fetchClases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/maestro/clases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }

      const data = await response.json();
      setClases(data);
    } catch (err) {
      setError(err.message);
    }
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

        <div className="main-panel p-5 ">
          <h1 className="fw-bold">Inicio</h1>
          <p>Bienvenido Maestro</p>

          <button
            className="btn btn-warning fw-bold px-4 py-2 rounded-3 shadow-sm mb-4"
            onClick={() => setMostrarForm(true)}
          >
            Crear Nueva Clase
          </button>

          {mostrarForm && (
            <div
              className="bg-white rounded-4 p-4 shadow-sm mb-4"
              style={{ maxWidth: "600px" }}
            >
              <button
                onClick={() => setMostrarForm("")}
                className="btn-close"
                aria-label="Cerrar"
              ></button>
              <h5 className="fw-bold mb-4">Registrar Clase</h5>
              <form onSubmit={handleCreateClass}>
                <div className="mb-3">
                  <label className="form-label">Nombre de la clase</label>
                  <input
                    type="text"
                    name="nombre"
                    value={nombreClase}
                    onChange={(e) => setNombreClase(e.target.value)}
                    className="form-control rounded-3"
                    placeholder="Ej. Álgebra lineal"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={descripcionClase}
                    onChange={(e) => setDescripcionClase(e.target.value)}
                    className="form-control rounded-3"
                    placeholder="Breve descripción de la clase"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Cuatrimestre</label>
                  <input
                    type="number"
                    name="cuatrimestre"
                    value={cuatrimestreClase}
                    onChange={(e) => setCuatrimestreClase(e.target.value)}
                    className="form-control rounded-3"
                    min="1"
                    max="10"
                    placeholder="Ej. 3"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Código de clase</label>
                  <input
                    type="text"
                    name="codigo_clase"
                    value={codigo_clase}
                    onChange={(e) => setCodigoClase(e.target.value)}
                    className="form-control rounded-3"
                    placeholder="Ej. 4"
                    required
                  />
                </div>

                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm"
                  >
                    Guardar Clase
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4 py-2"
                    onClick={() => setMostrarForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <h2 className="mt-4">Lista de Clases</h2>
          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : clases === null ? (
            <p className="text-secondary">Aún no hay clases disponibles.</p>
          ) : (
            <div className="d-flex flex-wrap gap-4">
              {/* {clases.map((clase, index) => ( */}
              {(clases?.length ? clases : clases).map((clase, index) => (
                <ClaseCard
                  key={index}
                  nombre={clase.nombre}
                  cuatrimestre={clase.cuatrimestre}
                  maestro={clase.maestro}
                  carrera={clase?.carrera?.nombre ?? "Carrera no especificada"}
                  onClick={() => {
                    localStorage.setItem("clase", JSON.stringify(clase));
                    navigate(`/teacher/class/${clase.id}`);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InicioMaestro;
