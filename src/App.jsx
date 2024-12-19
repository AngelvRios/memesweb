import React from "react";
import { MantineProvider } from "@mantine/core";
import Inicio from "./paginas/inicio/inicio.jsx";
import ProveedorAutenticacion from "./contexto/ContextoAutenticacion.jsx";
import MallaCurricular from "./components/MallaCurricular";

export default function App() {
    return (
        <MantineProvider>
            <ProveedorAutenticacion>
                <Inicio />
                <MallaCurricular />
            </ProveedorAutenticacion>
        </MantineProvider>
    );
}
