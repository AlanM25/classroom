import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import InicioAlumno from './pages/student/Inicio';
import InicioMaestro from './pages/teacher/Inicio';
import ClaseAlumno from './pages/student/Clase';
import ClaseMaestro from './pages/teacher/Clase';
import TemaMaestro from './pages/teacher/Tema';
import TareaMaestro from './pages/teacher/Tarea';
import RevisionesMaestro from './pages/teacher/Revisiones';
import TareasPendientes from './pages/teacher/TareasPendientes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/inicio" element={<InicioAlumno />} />
        <Route path="/student/class/:id_clase" element={<ClaseAlumno />} />
        <Route path="/teacher/inicio" element={<InicioMaestro />} />
        <Route path="/teacher/class/:id_clase" element={<ClaseMaestro />} />
        <Route path="/teacher/class/:id_clase/temas" element={<TemaMaestro />} />
        <Route path="/teacher/tareas-calificar" element={<TareasPendientes />} />
        <Route path="/teacher/class/:id_clase/:id_tarea/instrucciones" element={<TareaMaestro />} />
        <Route path="/teacher/class/:id_clase/:id_tarea/revisiones" element={<RevisionesMaestro />} />
      </Routes>
    </Router>
  );
}

export default App;
