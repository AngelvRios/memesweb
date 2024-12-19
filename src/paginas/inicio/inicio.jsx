import { useState, useContext } from "react";
import { Container, Grid, Button, Loader } from "@mantine/core";
import ElementoMeme from "../../components/ElementoMeme/ElementoMeme";
import ModalImagen from "../../components/ModalImagen/ModalImagen";
import ModalAutenticacion from "../../components/ModalAutenticacion/ModalAutenticacion";
import ModalRegistro from "../../components/ModalRegistro/ModalRegistro";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import useMemes from "../../hooks/useMemes";
import estilos from './EstilosInicio.module.css';

const Inicio = () => {
  const contexto = useContext(ContextoAutenticacion);
  const { estaAutenticado } = contexto;
  const { memes, estaCargando, cargarMasMemes } = useMemes();

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [modalImagenVisible, setModalImagenVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false);
  const [modalAutenticacionVisible, setModalAutenticacionVisible] = useState(false);

  const manejarPresionarImagen = (imgUrl) => {
    setImagenSeleccionada(imgUrl);
    setModalImagenVisible(true);
  };

  return (
    <Container className={estilos.contenedor}>
      <Grid gutter="md">
        {memes.map((meme) => (
          <Grid.Col span={4} key={meme._id}>
            <ElementoMeme meme={meme} manejarPresionarImagen={manejarPresionarImagen} />
          </Grid.Col>
        ))}
      </Grid>

      {estaCargando && <Loader size="xl" className={estilos.loader} />}

      <ModalImagen
        urlImagen={imagenSeleccionada}
        visible={modalImagenVisible}
        setVisible={setModalImagenVisible}
      />

      <ModalRegistro
        visible={modalRegistroVisible}
        setVisible={setModalRegistroVisible}
      />

      <ModalAutenticacion
        visible={modalAutenticacionVisible}
        setVisible={setModalAutenticacionVisible}
      />
      
      <div className={estilos.contenedorBoton}>
        <Button
          variant="outline"
          className={estilos.cargarMas}
          onClick={cargarMasMemes}
          disabled={estaCargando}
        >
          Cargar más memes
        </Button>
        {!estaAutenticado && (
          <>
            <Button onClick={() => setModalAutenticacionVisible(true)}>
              Iniciar sesión
            </Button>
            <Button onClick={() => setModalRegistroVisible(true)}>
              Registrarse
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Inicio;