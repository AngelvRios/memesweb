import { useState, useContext } from "react";
import { Modal, TextInput, Button } from "@mantine/core";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import estilos from "./EstilosModalRegistro.module.css";

const ModalRegistro = ({ visible, actualizaVisibilidad }) => {
  const [usuario, actualizaUsuario] = useState("");
  const [contraseña, actualizaContraseña] = useState("");
  const [error, setError] = useState("");
  const { autenticarUsuario } = useContext(ContextoAutenticacion);

  const manejarEnvio = async () => {
    setError("");

    const esExitoso = await autenticarUsuario(usuario, contraseña);
    if (esExitoso) {
      actualizaVisibilidad(false);
    } else {
      setError("Datos ingresados incorrectamente.");
    }
  };

  return (
    <Modal
      opened={visible}
      onClose={() => actualizaVisibilidad(false)}
      centered
      size="sm"
      withCloseButton={false}
    >
      <div className={estilos.contenidoModal}>
        <h2 className={estilos.titulo}>Registro</h2>

        {/* Mostrar error si existe */}
        {error && <div className={estilos.error}>{error}</div>}

        <TextInput
          placeholder="Usuario"
          value={usuario}
          onChange={(event) => actualizaUsuario(event.target.value)}
          className={estilos.entradaTexto}
        />
        <TextInput
          placeholder="Contraseña"
          value={contraseña}
          onChange={(event) => actualizaContraseña(event.target.value)}
          type="password"
          className={estilos.entradaTexto}
        />
        <Button
          fullWidth
          onClick={manejarEnvio}
          className={estilos.boton}
        >
          Enviar
        </Button>
        <Button
          fullWidth
          onClick={() => actualizaVisibilidad(false)}
          className={`${estilos.boton} ${estilos.botonCerrar}`}
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalRegistro;
