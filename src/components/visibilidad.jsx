import { useState } from "react";
import ModalAutenticacion from "./ModalAutenticacion/ModalAutenticacion";
import { ContextoAutenticacion } from "../contexto/ContextoAutenticacion";
import ModalRegistro from "./ModalRegistro/ModalRegistro";  

const Visibilidad = () => {
  const [visibleAutenticacion, setVisibleAutenticacion] = useState(false);
  const [visibleRegistro, setVisibleRegistro] = useState(false);

  // Función para actualizar la visibilidad de los modales
  const actualizaVisibilidadAutenticacion = (valor) => {
    setVisibleAutenticacion(valor);
  };

  const actualizaVisibilidadRegistro = (valor) => {
    setVisibleRegistro(valor);
  };

  return (
    <ContextoAutenticacion.Provider value={{ autenticarUsuario: () => true }}>
      <button onClick={() => actualizaVisibilidadAutenticacion(true)}>Iniciar sesión</button>
      <button onClick={() => actualizaVisibilidadRegistro(true)}>Registrarse</button>

      {/* Modal de Autenticación */}
      <ModalAutenticacion
        visible={visibleAutenticacion}
        actualizaVisibilidad={actualizaVisibilidadAutenticacion}
      />

      {/* Modal de Registro */}
      <ModalRegistro
        visible={visibleRegistro}
        actualizaVisibilidad={actualizaVisibilidadRegistro}
      />
    </ContextoAutenticacion.Provider>
  );
};

export default Visibilidad;
