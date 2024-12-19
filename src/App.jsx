import React from "react";
import { MantineProvider } from "@mantine/core";
import Inicio from "./paginas/inicio/inicio.jsx";
import ProveedorAutenticacion from "./contexto/ContextoAutenticacion.jsx";

export default function App() {
    return (
        <MantineProvider
            theme={{
                colorScheme: "light",
                fontFamily: "Arial, sans-serif",
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <ProveedorAutenticacion>
                <Inicio />
            </ProveedorAutenticacion>
        </MantineProvider>
    );
}
