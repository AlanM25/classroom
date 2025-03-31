import React from 'react';
import SidebarAlumno from '../../components/Navbars/SidebarAlumno';
import Topbar from '../../components/Navbars/Topbar';
import ClaseCard from '../../components/ClaseCard';


// QUITAR cuando este el back
const clasesMock = [
  {
    nombre: 'Fisica II',
    cuatrimestre: 3,
    nombre_maestro: 'Javier Martínez Silva',
    carrera: 'Ingeniería en Tecnologías de la Información',
    foto_maestro: 'https://i.pravatar.cc/40?img=1',
  },
  {
    nombre: 'Matemáticas I',
    cuatrimestre: 5,
    nombre_maestro: 'Erick Mata Vera',
    carrera: 'Ingeniería en Tecnologías de la Información',
    foto_maestro: 'https://i.pravatar.cc/40?img=2',
  },
  {
    nombre: 'Desarrollo Web',
    cuatrimestre: 6,
    nombre_maestro: 'Alejandra Zúñiga López',
    carrera: 'Ingeniería en Tecnologías de la Información',
    foto_maestro: 'https://i.pravatar.cc/40?img=3',
  },
];

const InicioAlumno = () => {
  const usuario = {
    nombre: "Alumno Demo",
    foto_perfil: "", // Cuando esté listo el back, se reemplaza por la data real
  };

  return (
    <div className="d-flex">
      <SidebarAlumno />
      <div className="flex-grow-1">
        <Topbar user={usuario} />
        <div className="p-4">
          <div className="bg-warning-subtle rounded-4 p-4">
            <div className="row g-4">
              {clasesMock.map((clase, index) => (
                <div key={index} className="col-md-4">
                  <ClaseCard clase={clase} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioAlumno;
