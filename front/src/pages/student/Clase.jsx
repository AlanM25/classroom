import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ClaseAlumno() {
  const { id_clase } = useParams(); //Agarramos el id
  const [avisos, setAvisos] = useState([]); //Lista de avisos que existen
  const [error, setError] = useState(null);

  //Buscar avisos según el id
  useEffect(() => {
    if (id_clase) {
      fetchAvisos();
    }
  }, [id_clase]);

  const fetchAvisos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/alumno/avisos/${id_clase}`);

      if (!response.ok) {
        throw new Error("Error al obtener avisos");
      }

      const data = await response.json();
      setAvisos(data.length > 0 ? data : null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Clase {id_clase}</h1>
      <p>Vista alumnos</p>

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
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ClaseAlumno;
