import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ClaseMaestro() {
  const { id_clase } = useParams(); //Agarramos el id
  const [avisos, setAvisos] = useState([]); //Lista de avisos que existen
  const [error, setError] = useState(null);
  const [contenido, setContenido] = useState(""); //Contenido del aviso
  const [archivo, setArchivo] = useState(null); //archivo en aviso

  //Buscar avisos según el id
  useEffect(() => {
    if (id_clase) {
      fetchAvisos();
    }
  }, [id_clase]);

  //Buscar avisos
  const fetchAvisos = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/avisos/${id_clase}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener avisos");
      }

      const data = await response.json();
      setAvisos(data.length > 0 ? data.reverse() : null); //Ordenar los más recientes primero
    } catch (err) {
      setError(err.message);
    }
  };

  //Crear un nuevo aviso
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contenido", contenido); //texto del aviso en el formdata
    if (archivo) {
      formData.append("archivo", archivo); //archivo si es que hay
    }
    formData.append("clase_id", id_clase);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/avisos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el aviso");
      }

      //Actualizar la lista de avisos
      fetchAvisos();
      setContenido("");
      setArchivo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Clase {id_clase}</h1>
      <p>Vista Maestros</p>

      <form onSubmit={handleSubmit} className="mb-4">
        <table>
          <tbody>
            <tr>
              <td>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Escribe un aviso..."
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setArchivo(e.target.files[0])}
                  className="mt-2"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  type="submit"
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Agregar aviso
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h2>Lista de avisos</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : avisos === null ? (
        <p className="text-gray-500">Todo limpio por aquí</p>
      ) : (
        <ul className="space-y-2">
          {avisos.map((aviso, index) => (
            <li key={index} className="p-3 border rounded-lg shadow bg-white">
              <strong>{aviso.contenido}</strong>
              {aviso.archivo && (
                <p>
                  <a
                    href={aviso.archivo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Ver archivo
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ClaseMaestro;
