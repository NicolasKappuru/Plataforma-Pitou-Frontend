import Boton from '../Boton/Boton'

import "./EtiquetaAutor.css"

const EtiquetaAutor = ({titulo_glosario}) => {

    return(
        <div className="contenedor-etiqueta-glosario">
            <div className="btn-space"> <Boton icon="chevron-left" variant='regreso' /> </div>
            <div className = "titulo-glosario" >{titulo_glosario} </div>
        </div>
    )

};

export default EtiquetaAutor; 