import React, { useEffect, useState } from "react";
import ClassCard from "../../components/classCard";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/App.css";
import "../../styles/maestros.css";

export default function TeacherHome() {
  const [classes, setClasses] = useState([]);

  const teacherId = 123; // Ejemplo

  const clases = {
    id:1,
    name:"HOLA",
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/clases?teacherId=${teacherId}`)
      .then((response) => response.json())
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error al obtener las clases:", error);
      });
  }, [teacherId]);

  return (
    <div className="index">
      <Header/>
    </div>
  );
}
