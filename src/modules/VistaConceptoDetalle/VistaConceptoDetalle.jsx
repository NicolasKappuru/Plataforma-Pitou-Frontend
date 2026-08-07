import { useLocation } from "react-router-dom";

import VistaTextoEnriquecido from '../../shared/VistaTextoEnriquecido/VistaTextoEnriquecido'

import "./VistaConceptoDetalle.css"



const VistaConceptoDetalle = () => {

    const location = useLocation();
    const concepto = location.state;


    return(
        <div className="pagina">
            <div className="titulo-concepto">
                {concepto.titulo}
            </div>

            <div className="categoria-concepto" style={{ "--color-dinamico": concepto.color}}>
                {concepto.categoria} 
            </div>

            <hr className="separador"></hr>

            <div className="descripcion-label"> Descripción: </div>

            <div className="descripcion">
                <VistaTextoEnriquecido 
                    contenido={concepto.descripcion}
                /> 
            </div>
        </div>
    )
}

export default VistaConceptoDetalle;