import "./VistaEspera.css"

import { useEffect, useState } from "react";
import { obtenerNombre } from "./services/pruebaService";

const VistaEspera = () => {

    const [nombre, setNombre] = useState("");

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
        </div>
    )
}

export default VistaEspera; 