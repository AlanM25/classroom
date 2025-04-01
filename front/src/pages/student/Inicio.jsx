import React, { useState, useEffect } from "react";

function InicioAlumno() {
  const [clases, setClases] = useState([]); //guardar la lista de clases que encuentre
  const [error, setError] = useState(null);

  //Para que busque clases al entrar
  useEffect(() => {
    fetchClases();
  }, []);

  //Recupera la lista de clases
  const fetchClases = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/alumno",{
        method: "GET"
      });

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
      <p>Bienvenido Alumno</p>

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

export default InicioAlumno;
