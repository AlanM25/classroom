import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";


export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a enviar en JSON:", formData);
    navigate("/maestros");

    /*
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        navigate("/maestros");
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
      });
    */
  };

  return (
    <div className="d-flex flex-column p-0">
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@upv.edu.mx"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="......."
                  required
                />
              </div>

              <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesión
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => alert("Funcionalidad de recuperar contraseña")}
                >
                  Recuperar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}