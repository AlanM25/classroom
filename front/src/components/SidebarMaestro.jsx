import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HouseFill, ClipboardCheck, PlusSquare } from "react-bootstrap-icons";

const SidebarMaestro = () => {
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);

  useEffect(() => {
    fetchclases();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        alert("Error al cerrar sesión.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("No se pudo cerrar sesión.");
    }
  };

  const fetchclases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/maestro/clases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setClases(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between vh-100">
      <div>
        <h4 className="fw-bold mb-3">UPV</h4>

        <NavLink
          to="/teacher/inicio"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${
              isActive ? "text-warning fw-bold" : "text-dark"
            }`
          }
        >
          <HouseFill className="me-2" /> Inicio
        </NavLink>

        <NavLink
          to="/teacher/tareas-calificar"
          className={({ isActive }) =>
            `mb-3 text-decoration-none fw-semibold d-flex align-items-center ${
              isActive ? "text-warning fw-bold" : "text-dark"
            }`
          }
        >
          <ClipboardCheck className="me-2" /> Calificar tareas
        </NavLink>

        <div className="mt-4">
          <h6 className="fw-bold text-uppercase">Mis clases</h6>
          {clases.length === 0 ? (
            <p className="text-muted small">No hay clases asignadas</p>
          ) : (
            <ul className="list-unstyled">
              {clases.map((clase) => (
                <li key={clase.id}>
                  <NavLink
                    to={`/teacher/class/${clase.id}`}
                    onClick={() =>
                      localStorage.setItem("clase", JSON.stringify(clase))
                    }
                    className={({ isActive }) =>
                      `text-decoration-none fw-semibold d-flex align-items-center mb-2 ${
                        isActive ? "text-warning fw-bold" : "text-dark"
                      }`
                    }
                  >
                    <PlusSquare className="me-2" /> {clase.nombre}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="btn btn-warning fw-bold rounded-3 shadow-sm w-100"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default SidebarMaestro;
