import React, { useState } from "react";
import "./Login.css";
import loginStudentImg from "../../assets/login_student.png";
import { useNavigate } from "react-router-dom";

/* import { fakeLogin } from '../../mocks/fakeLogin'; */

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!correo.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const datos = {
        correo: correo,
        password: password,
      };

      const response = await fetch(
        //Api para logear
        "http://127.0.0.1:8000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      /* const response = await fakeLogin(correo, password); */

      /* const { user, token } = response; */
      const respuesta = await response.json(); //Lo que retorna la api

      /* localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); */

      if (response.ok) {
        localStorage.setItem("token", respuesta.token); //El token que ya guardaban
        localStorage.setItem("user", JSON.stringify(respuesta.user)); //El usuario entero

        alert(respuesta.message);
        if (respuesta.user.rol === "maestro") {
          navigate("/teacher/inicio");
        } else if (respuesta.user.rol === "alumno") {
          navigate("/student/inicio");
        } else {
          setError("Rol no reconocido");
        }
      } else {
        alert(`Error: ${respuesta.message}`);
      }
    } catch (err) {
      setError(err);
      console.error("Error al enviar los datos:", err);
      alert("Datos incorrectos. Intente denuevo");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2 className="title">Inicio de sesión</h2>

          <form onSubmit={handleLogin}>
            <label>Correo:</label>
            <input
              className="form-control"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingresa tu correo..."
            />

            <label className="mt-3">Contraseña:</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña..."
            />

            {error && <p className="text-danger mt-2">{error}</p>}

            <button type="submit" className="btn btn-warning mt-4 w-100 fw-bold">Iniciar sesión</button>
          </form>
        </div>

        <div className="login-right">
          <div className="upv-label">UPV</div>
          <img src={loginStudentImg} alt="login" className="img-student" />
        </div>
      </div>
    </div>
  );
}

export default Login;
