import React, { useState, useEffect } from "react";

function InicioMaestro() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cuatrimestre: "",
    carrera_id: "",
    codigo_clase: "",
  });
  const [clases, setClases] = useState([]);
  const [error, setError] = useState(null);

  //Para que busque clases al entrar
  useEffect(() => {
    fetchClases();
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const respuesta = await response.json();

      if (response.ok) {
        alert(respuesta.message);
        fetchClases();
      } else {
        alert(`Error: ${respuesta.message}`);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error al enviar los datos:", err);
      alert("Hubo un error al conectar con el servidor.");
    }

    console.log("Clase creada:", formData);
    setMostrarForm(false);
  };

  const fetchClases = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/clases");

      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }

      const data = await response.json();
      setClases(data.length > 0 ? data : null); //Si no hay clases que mejor sea nulo
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Inicio</h1>
      <p>Bienvenido Maestro</p>

      <button onClick={() => setMostrarForm(true)}>Crear Nueva Clase</button>

      {mostrarForm && (
        <div className="form-container">
          <h2>Crear Clase</h2>
          <form onSubmit={handleCreateClass}>
            <table>
              <tbody>
                <tr>
                  <td>Nombre:</td>
                  <td>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChangeForm}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Descripción:</td>
                  <td>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChangeForm}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Cuatrimestre:</td>
                  <td>
                    <input
                      type="number"
                      name="cuatrimestre"
                      value={formData.cuatrimestre}
                      onChange={handleChangeForm}
                      min="1"
                      max="10"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Carrera:</td>
                  <td>
                    <input
                      type="text"
                      name="carrera_id"
                      value={formData.carrera_id}
                      onChange={handleChangeForm}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type="submit">Guardar Clase</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => setMostrarForm(false)}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )}

      <h2>Lista de Clases</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : clases === null ? (
        <p className="text-gray-500">Aún no hay clases disponibles.</p>
      ) : (
        <ul className="space-y-2">
          {clases.map((clase, index) => (
            <li key={index} className="p-3 border rounded-lg shadow bg-white">
              <strong>{clase.nombre}</strong> - {clase.horario}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default InicioMaestro;
