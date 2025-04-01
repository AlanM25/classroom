import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarMaestro from "../../components/SidebarMaestro";
import Topbar from '../../components/Topbar';
import './layout.css';



function ClaseMaestro() {
  const { id_clase } = useParams(); //Agarramos el id
  const [avisos, setAvisos] = useState([]); //Lista de avisos que existen
  const [error, setError] = useState(null);
  const [contenido, setContenido] = useState(""); //Contenido del aviso
  const [archivo, setArchivo] = useState(null); //archivo en aviso
  const [user, setUser] = useState(null);//perfil


  //Buscar avisos y perfil según el id
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }

    if (id_clase) {
      fetchAvisos();
    }
  }, [id_clase]);


  //Buscar avisos
  const fetchAvisos = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/clases/${id_clase}/avisos`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener avisos");
      }

      const data = await response.json();
      setAvisos(data.length > 0 ? data.reverse() : null); //Ordenar los más recientes primero
    } catch (err) {
      setError(err.message);
    }
  };

  //Crear un nuevo aviso
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contenido", contenido); //texto del aviso en el formdata
    if (archivo) {
      formData.append("archivos[]", archivo); //archivo si es que hay
    }
    formData.append("clase_id", id_clase);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/avisos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al agregar el aviso");
      }

      //Actualizar la lista de avisos
      fetchAvisos();
      setContenido("");
      setArchivo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-layout">
      <div className="sidebar-fixed">
        <SidebarMaestro />
      </div>

      <div style={{ marginLeft: '200px', width: '100%' }}>
        <div className="topbar-fixed">
          <Topbar user={user} />
        </div>

        <div className="main-panel p-5">
          <h1 className="fw-bold">Clase {id_clase}</h1>
          <p>Vista Maestro</p>

          <div className="bg-white rounded-4 p-4 shadow-sm mb-4" style={{ maxWidth: '600px' }}>
            <h5 className="fw-bold mb-3">Agregar Aviso</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Contenido</label>
                <textarea
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  className="form-control rounded-3"
                  placeholder="Escribe un aviso..."
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label">Adjuntar archivo (opcional)</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setArchivo(e.target.files[0])}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-warning fw-bold px-4 py-2 rounded-pill shadow-sm">
                Agregar aviso
              </button>
            </form>
          </div>

          <h2 className="fw-semibold mt-4">Lista de avisos</h2>
          {error ? (
            <p className="text-danger">Error: {error}</p>
          ) : avisos === null ? (
            <p className="text-secondary">Todo limpio por aquí</p>
          ) : (
            <ul className="list-unstyled mt-3">
              {avisos.map((aviso, index) => (
                <li key={index} className="p-3 mb-3 border rounded shadow bg-white">
                  <strong>{aviso.contenido}</strong>
                  {aviso.archivo && (
                    <p className="mt-2 mb-0">
                      <a
                        href={aviso.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                      >
                        Ver archivo
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClaseMaestro;
