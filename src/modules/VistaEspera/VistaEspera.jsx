import "./VistaEspera.css"

import { useEffect, useState } from "react";
import { obtenerNombre } from "./services/pruebaService";

import ListaPlugins from "../../shared/GestorPlugins/ListaPlugins/ListaPlugins";
import { opcionesPlugins } from "../../assets/opciones_plugins";
import { imagenesPrueba } from "../../assets/imagenes_prueba";
import { bloquesCodigo } from "../../assets/bloques_codigo";
import { formulasPruebas } from "../../assets/formulas_pruebas";

const crearPluginsDemo = () => [
    ...imagenesPrueba.map((plugin) => ({ ...plugin, tipo: "imagen" })),
    ...bloquesCodigo.map((plugin) => ({ ...plugin, tipo: "bloque_codigo" })),
    ...formulasPruebas.map((plugin) => ({ ...plugin, tipo: "formula" })),
];

const VistaEspera = () => {

    const [nombre, setNombre] = useState("");
    const [pluginsDemo, setPluginsDemo] = useState(crearPluginsDemo);

    const manejarAgregar = (plugin) => {
        setPluginsDemo((previos) => [...previos, plugin]);
    };

    const manejarActualizar = (plugin) => {
        setPluginsDemo((previos) =>
            previos.map((item) =>
                `${item.tipo}-${item.id}` === `${plugin.tipo}-${plugin.id}` ? plugin : item
            )
        );
    };

    const manejarEliminar = (plugin) => {
        setPluginsDemo((previos) =>
            previos.filter((item) => `${item.tipo}-${item.id}` !== `${plugin.tipo}-${plugin.id}`)
        );
    };

    useEffect(()=>{
            obtenerNombre()
            .then(response=>{
                setNombre(response.data.dato);
            })
            .catch(error=>{
                console.log(error);
            });
        },[]);

    return(
        <div>
            <div className="vista-espera">  En construccion...</div>
            <h1 className="nombre-prueba"> {nombre} </h1>

            <ListaPlugins
                plugins={pluginsDemo}
                opciones={opcionesPlugins}
                onAgregar={manejarAgregar}
                onActualizar={manejarActualizar}
                onEliminar={manejarEliminar}
                onCambioOrden={setPluginsDemo}
            />
        </div>
    )
}

export default VistaEspera; 