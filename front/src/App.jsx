
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import InicioAlumno from './pages/student/Inicio';
import InicioMaestro from './pages/teacher/Inicio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/inicio" element={<InicioAlumno />} />
        <Route path="/teacher/inicio" element={<InicioMaestro />} />
      </Routes>
    </Router>
  );
}

export default App;
