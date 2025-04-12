import React, { useEffect, useState } from "react";
import { Book, ClipboardCheck, FileText } from "react-bootstrap-icons";

const ContenidoAlumno = ({ id_clase }) => {
  const [temas, setTemas] = useState([]);

  useEffect(() => {
    // ----qqq
    const mockTemas = [
      {
        titulo: "Introducción a React",
        descripcion: "Conceptos básicos, JSX, componentes.",
        materiales: [
          {
            nombre: "Guía de React",
            url: "#",
            tipo: "pdf",
          },
        ],
        tareas: [
          {
            titulo: "Tarea 1: Hola Mundo",
            fecha_entrega: "2025-04-15",
          },
        ],
      },
      {
        titulo: "Hooks y Estado",
        descripcion: "useState, useEffect y custom hooks.",
        materiales: [],
        tareas: [],
      },
    ];

    setTemas(mockTemas);
  }, [id_clase]);

  return (
    <div className="mt-4">
      {temas.length === 0 ? (
        <p className="text-secondary">Aún no hay temas asignados.</p>
      ) : (
        temas.map((tema, index) => (
          <div key={index} className="bg-warning-subtle rounded p-4 mb-4 shadow-sm">
            <h5 className="fw-bold mb-2">
              <Book className="me-2 text-warning" />
              {tema.titulo}
            </h5>
            <p className="mb-3">{tema.descripcion}</p>

            {tema.materiales.length > 0 && (
              <div className="mb-3">
                <h6 className="fw-semibold">
                  <FileText className="me-2 text-info" />
                  Materiales
                </h6>
                <ul className="list-unstyled">
                  {tema.materiales.map((material, i) => (
                    <li key={i}>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-primary text-decoration-none"
                      >
                        {material.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tema.tareas.length > 0 && (
              <div>
                <h6 className="fw-semibold">
                  <ClipboardCheck className="me-2 text-success" />
                  Tareas
                </h6>
                <ul className="list-unstyled">
                  {tema.tareas.map((tarea, i) => (
                    <li key={i}>
                      {tarea.titulo} — <small className="text-muted">Entrega: {tarea.fecha_entrega}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ContenidoAlumno;
