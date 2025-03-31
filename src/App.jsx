import { BrowserRouter, useRoutes } from "react-router-dom";
import "./styles/app.css";

import Login from "./pages/login";
import Navbar from "./components/Navbar";
import IndexMaestro from "./pages/maestros";
import IndexAlumno from "./pages/alumnos";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/maestros", element: <IndexMaestro /> },
    { path: "/alumnos", element: <IndexAlumno /> },
  ]);
  return routes;
};

function App() {
  return(
    <BrowserRouter>
      <AppRoutes></AppRoutes>
    </BrowserRouter>
  )
}

export default App;
