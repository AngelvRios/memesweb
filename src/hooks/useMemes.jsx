import { useState, useEffect } from "react";
import { obtenerMemes } from "../servicios/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [estaCargando, setEstaCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);

  const cargarMemes = (paginaActual) => {
    if (!hayMas) {
      setEstaCargando(false);
      return;
    }

    setEstaCargando(true);
    obtenerMemes(paginaActual, 10)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          setEstaCargando(false);
          return;
        }

        if (data.length < 10) {
          setHayMas(false);
        }

        if (data.length) {
          // Filtrar memes duplicados por su ID
          setMemes((prevMemes) => {
            const memesUnicos = [
              ...prevMemes,
              ...data.filter(
                (newMeme) => !prevMemes.some((prevMeme) => prevMeme._id === newMeme._id)
              ),
            ];
            return memesUnicos;
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setEstaCargando(false));
  };

  const cargarMasMemes = () => {
    setPagina((prevPagina) => prevPagina + 1);
    cargarMemes(pagina + 1);
  };

  useEffect(() => {
    cargarMemes(pagina);
  }, [pagina]);

  return { memes, estaCargando, cargarMasMemes };
};

export default useMemes;