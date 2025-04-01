import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SidebarAlumno from "../../components/SidebarAlumno";
import Topbar from "../../components/Topbar";
import ClaseCard from "../../components/ClaseCard";
import './layout.css';



//PRUEBA--------------------------------------------------
const clasesDummy = [
  {
    id: 1,
    nombre: "Historia de México",
    cuatrimestre: 2,
    descripcion: "Cultura prehispánica y colonial",
    carrera: { nombre: "Ingeniería Industrial" },
    maestro: {
      nombre: "Carlos",
      apellido: "Ramírez",
      foto_perfil: "https://randomuser.me/api/portraits/men/21.jpg",
    },
  },
  {
    id: 2,
    nombre: "Programación Orientada a Objetos",
    cuatrimestre: 3,
    descripcion: "POO con Java",
    carrera: { nombre: "Ingeniería en Sistemas Computacionales" },
    maestro: {
      nombre: "Laura",
      apellido: "Martínez",
      foto_perfil: "https://randomuser.me/api/portraits/women/31.jpg",
    },
  },
];

//------------------_BORRAR_-----------------------------------------



function InicioAlumno() {
  const [clases, setClases] = useState([]); //guardar la lista de clases que encuentre
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); //foto de perfil
  const navigate = useNavigate(); 


  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

   // fetchClases();  esto lo descomentan cuando conecten al back
  }, []);

  //Recupera la lista de clases
  const fetchClases = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/alumno",{
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Error al obtener las clases");
      }

      const data = await response.json();
      setClases(data.length > 0 ? data : null); //Si no hay clases que mejor sea nulo
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarAlumno />
      </div>

      <div style={{ marginLeft: "200px", width: "100%" }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5">
          <h1 className="fw-bold">Inicio</h1>
          <p>Bienvenido Alumno</p>

          <h2 className="mt-4 fw-semibold">Lista de Clases</h2>

          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : (
            <div className="d-flex flex-wrap gap-4 mt-3">
              {/* {clases.map((clase, index) => ( */}
              {(clases.length > 0 ? clases : clasesDummy).map((clase, index) => (
                <ClaseCard
                  key={index}
                  nombre={clase.nombre}
                  cuatrimestre={clase.cuatrimestre}
                  carrera={clase?.carrera?.nombre ?? 'Carrera no especificada'}
                  maestro={clase.maestro}
                  onClick={() => navigate(`/student/class/${clase.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default InicioAlumno;
