import { useState, useContext } from "react";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import { subirMeme } from "../../servicios/memes";
import estilos from "./EstilosModalSubirMeme.module.css";

const ModalSubirMeme = ({ visible, actualizaVisibilidad, actualizarMemes }) => {
  const { credenciales, estaAutenticado } = useContext(ContextoAutenticacion);

  const [titulo, actualizaTitulo] = useState("");
  const [descripcion, actualizaDescripcion] = useState("");
  const [imagen, actualizaImagen] = useState(null);

  const eligeImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      actualizaImagen(archivo);
    }
  };

  const manejaSubida = () => {
    if (!imagen || !titulo || !descripcion) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (!estaAutenticado || !credenciales) {
      alert("Debe iniciar sesión para subir memes.");
      return;
    }
    subirMeme(credenciales.access_token, titulo, descripcion, imagen).then(
      ([_, error]) => {
        if (error) {
          alert(error);
          return;
        }
        alert("Meme subido correctamente.");
        actualizaVisibilidad(false);
        actualizarMemes();
      }
    );
  };

  return (
    visible && (
      <div className={estilos.contenedorModal}>
        <div className={estilos.contenidoModal}>
          <h2 className={estilos.titulo}>Subir Meme</h2>
          <input
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={(e) => actualizaTitulo(e.target.value)}
            className={estilos.entradaTexto}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => actualizaDescripcion(e.target.value)}
            className={estilos.entradaTexto}
          />
          {imagen && <p className={estilos.nombreImagen}>{imagen.name}</p>}
          <input
            type="file"
            accept="image/*"
            onChange={eligeImagen}
            className={estilos.inputArchivo}
          />
          <button onClick={manejaSubida} className={estilos.boton}>
            Subir
          </button>
          <button
            onClick={() => actualizaVisibilidad(false)}
            className={`${estilos.boton} ${estilos.botonCerrar}`}
          >
            Cerrar
          </button>
        </div>
      </div>
    )
  );
};

export default ModalSubirMeme;
