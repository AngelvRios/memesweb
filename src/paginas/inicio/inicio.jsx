import React, { useState, useEffect } from "react";
import { Button, Group } from "@mantine/core";
import ModalAutenticacion from "../../components/ModalAutenticacion/ModalAutenticacion.jsx";
import ModalRegistro from "../../components/ModalRegistro/ModalRegistro.jsx";
import ElementoMeme from "../../components/ElementoMeme/ElementoMeme.jsx";
import { obtenerMemes } from "../../servicios/memes"; // Asegúrate de importar la función

export default function Inicio() {
    const [memes, setMemes] = useState([]); // Inicializa como un array vacío
    const [visibleAuth, setVisibleAuth] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(false);
    const [count, setCount] = useState(1); // Cambia a 1 para empezar desde la primera página

    useEffect(() => {
        fetchMemes();
    }, [count]);

    const fetchMemes = async () => {
        const [data, error] = await obtenerMemes(count, 10);
        if (error) {
            console.error(error);
        } else {
            console.log(data); // Verifica la respuesta aquí
            if (Array.isArray(data)) {
                setMemes(data); // Usa data directamente si es un array
            } else {
                console.error("No se encontraron memes en la respuesta:", data);
            }
        }
    };

    return (
        <div>
            <Group position="apart" style={{ padding: "10px" }}>
                <Button onClick={() => setVisibleAuth(true)}>Iniciar Sesión</Button>
                <Button onClick={() => setVisibleRegister(true)}>Registrarse</Button>
            </Group>

            <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(2, 1fr)", padding: "10px" }}>
                {memes.map((meme) => (
                    <ElementoMeme key={meme._id} meme={meme} />
                ))}
            </div>

            <Group position="center">
                <Button onClick={() => setCount((prev) => prev + 1)}>Cargar más memes</Button>
            </Group>

            <ModalAutenticacion visible={visibleAuth} actualizaVisibilidad={setVisibleAuth} />
            <ModalRegistro visible={visibleRegister} actualizaVisibilidad={setVisibleRegister} />
        </div>
    );
}