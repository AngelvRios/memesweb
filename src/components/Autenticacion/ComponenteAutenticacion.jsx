import { useState } from "react";
import ModalAutenticacion from "../ModalAutenticacion/ModalAutenticacion";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";

const ComponenteAutenticacion = () => {
  const [visible, setVisible] = useState(false);

  // Función para actualizar la visibilidad del modal
  const actualizaVisibilidad = (valor) => {
    setVisible(valor);
  };

  return (
    <ContextoAutenticacion.Provider value={{ autenticarUsuario: () => true }}>
      <button onClick={() => actualizaVisibilidad(true)}>Iniciar sesión</button>
      <ModalAutenticacion visible={visible} actualizaVisibilidad={actualizaVisibilidad} />
    </ContextoAutenticacion.Provider>
  );
};

export default ComponenteAutenticacion;
