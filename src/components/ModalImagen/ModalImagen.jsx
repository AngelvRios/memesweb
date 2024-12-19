import { Modal, Button, Image } from "@mantine/core";
import estilos from "./EstilosModalImagen.module.css";

const ModalImagen = ({ visible, actualizaVisibilidad, urlImagen }) => {
  return (
    <Modal
      opened={visible}
      onClose={() => actualizaVisibilidad(false)}
      title={<div className={estilos.modalTitulo}>Imagen</div>}
      centered
      size="lg"
      className={estilos.modalImagen}
    >
      <Image
        src={urlImagen}
        alt="Vista de la imagen"
        withPlaceholder
        className={estilos.imagenVista}
      />
      <Button
        fullWidth
        mt="md"
        onClick={() => actualizaVisibilidad(false)}
        className={estilos.botonCerrar}
      >
        Cerrar
      </Button>
    </Modal>
  );
};

export default ModalImagen;
