import React, { useState, useContext } from "react";
import { ContextoAutenticacion } from "../../contexto/ContextoAutenticacion";
import { likeMeme } from "../../servicios/memes";
import estilos from "./EstilosElementoMeme.module.css";

function ElementoMeme({ meme, onPressImagen }) {
  const { usuarioAutenticado, estaAutenticado } = useContext(ContextoAutenticacion);
  const [likes, setLikes] = useState(meme.likes);
  const [isLiking, setIsLiking] = useState(false);

  const manejarLike = async () => {
    if (!estaAutenticado || !usuarioAutenticado) {
      alert("Debe iniciar sesión para dar me gusta.");
      return;
    }

    setIsLiking(true);

    try {
      const [nuevosLikes, error] = await likeMeme(usuarioAutenticado.access_token, meme._id);
      if (error) {
        alert("Error al dar me gusta: " + error);
      } else {
        setLikes(nuevosLikes);
      }
    } catch (err) {
      alert("Ocurrió un error inesperado: " + err.message);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className={estilos.contenedorMeme}>
      <h3 className={estilos.titulo}>{meme.title}</h3>
      <p className={estilos.descripcion}>{meme.description}</p>
      {meme.img_url ? (
        <div onClick={() => onPressImagen(meme.img_url)} className={estilos.imagenWrapper}>
          <img src={meme.img_url} alt={meme.title} className={estilos.imagen} />
        </div>
      ) : (
        <p className={estilos.errorImagen}>Imagen no disponible</p>
      )}
      <div className={estilos.cierreSeccion}>
        <button onClick={manejarLike} disabled={isLiking} className={estilos.botonLike}>
          {isLiking ? "Cargando..." : `❤️ ${likes}`}
        </button>
        <p className={estilos.usuario}>Posteado por: {meme.user}</p>
      </div>
    </div>
  );
}

export default ElementoMeme;
