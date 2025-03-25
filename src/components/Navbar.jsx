import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Página login</NavLink></li>
        <li><NavLink to="/maestros">Prueba link a maestros</NavLink></li>
        <li><NavLink to="/alumnos">Prueba link a alumnos</NavLink></li>
      </ul>
    </nav>
  );
}
