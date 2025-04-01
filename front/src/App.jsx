import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import InicioAlumno from './pages/student/Inicio';
import InicioMaestro from './pages/teacher/Inicio';
import ClaseAlumno from './pages/student/Clase';
import ClaseMaestro from './pages/teacher/Clase';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/inicio" element={<InicioAlumno />} />
        <Route path="/student/class/:id_clase" element={<ClaseAlumno />} />
        <Route path="/teacher/inicio" element={<InicioMaestro />} />
        <Route path="/teacher/class/:id_clase" element={<ClaseMaestro />} />
      </Routes>
    </Router>
  );
}

export default App;
