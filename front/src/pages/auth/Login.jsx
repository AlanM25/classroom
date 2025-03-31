import React, { useState } from 'react';
import '../../styles/Login.css';
import loginStudentImg from '../../assets/login_student.png';
import { useNavigate } from 'react-router-dom';
import { fakeLogin } from '../../mocks/fakeLogin';

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      // Cuando este back reemplazar
      const response = await fakeLogin(correo, password);

      const { user, token } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.rol === 1) {
        navigate('/teacher/inicio'); 
      } else if (user.rol === 2) {
        navigate('/student/inicio'); 
      } else {
        setError('Rol no reconocido');
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2 className="title">Inicio de sesión</h2>

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

          <button
            className="btn btn-warning mt-4 w-100 fw-bold"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
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
