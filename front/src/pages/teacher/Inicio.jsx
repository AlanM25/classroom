function InicioMaestro() {
  const navigate = useNavigate();

  const handleClass = async (e) => {
    try {
      const usuario = localStorage.getItem("user");

      const response = await fetch(
        //Api para logear
        "http://127.0.0.1:8000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      /* const response = await fakeLogin(correo, password); */

      /* const { user, token } = response; */
      const respuesta = await response.json(); //Lo que retorna la api

      /* localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); */

      if (response.ok) {
        localStorage.setItem("token", respuesta.token); //El token que ya guardaban
        localStorage.setItem("user", JSON.stringify(respuesta.user)); //El usuario entero

        alert(respuesta.message);
        if (respuesta.user.rol === "maestro") {
          navigate("/teacher/inicio");
        } else if (respuesta.user.rol === "alumno") {
          navigate("/student/inicio");
        } else {
          setError("Rol no reconocido");
        }
      } else {
        alert(`Error: ${respuesta.message}`);
      }
    } catch (err) {
      setError(err);
      console.error("Error al enviar los datos:", err);
      alert("Hubo un error al conectar con el servidor.");
    }
  };
  
  return (
    <>
      <h1>Inicio</h1>
      <p>Bienvenido Maestro</p>
    </>
  );
}

export default InicioMaestro;
