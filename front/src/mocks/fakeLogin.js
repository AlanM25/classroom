//SIMULACION DEL LOGIN onta el back? ayuda

export function fakeLogin(matriculaOCorreo, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!matriculaOCorreo || !password) {
          return reject("Credenciales vacías");
        }
  
        if (matriculaOCorreo.includes("maestro")) {
          resolve({
            user: {
              nombre: "Maestro Demo",
              correo: matriculaOCorreo,
              rol: 1, 
            },
            token: "fake-jwt-maestro",
          });
        } else {
          resolve({
            user: {
              nombre: "Alumno Demo",
              correo: matriculaOCorreo,
              rol: 2,
            },
            token: "fake-jwt-alumno",
          });
        }
      }, 800); 
    });
  }
  