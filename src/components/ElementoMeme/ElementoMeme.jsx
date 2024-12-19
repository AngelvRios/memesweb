import React from "react";
import "./ElementoMeme.css";

function ElementoMeme({ meme }) {
  return (
    <div className="contenedorMeme">
      <h2 className="titulo">{meme.title}</h2>
      <p className="descripcion">{meme.description}</p>
      <img alt={meme.title} src={meme.image} className="imagen" />
      <div className="cierreSeccion">
        <p className="meGusta">👍 {meme.likes}</p>
        <p className="usuario">Posteado por: {meme.user}</p>
      </div>
    </div>
  );
}
export default ElementoMeme;
