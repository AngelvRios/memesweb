import { createContext, useState } from "react";
import { autenticar } from "../servicios/memes";

// Crear el contexto de autenticación
export const ContextoAutenticacion = createContext();

// Proveedor del contexto de autenticación
const ProveedorAutenticacion = ({ children }) => {  // Asegúrate de que sea un componente funcional
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  const autenticarUsuario = async (usuario, contraseña) => {
    try {
      const [creds, error] = await autenticar(usuario, contraseña);
      if (error) {
        console.error("Error al autenticar:", error);
        setEstaAutenticado(false);
        return false;
      }

      setUsuarioAutenticado(creds);
      setEstaAutenticado(true);
      return true;
    } catch (err) {
      console.error("Error inesperado:", err);
      setEstaAutenticado(false);
      return false;
    }
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuarioAutenticado,
        estaAutenticado,
        autenticarUsuario,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
};

// Exportar el proveedor para que pueda ser utilizado en otras partes de la aplicación
export default ProveedorAutenticacion;