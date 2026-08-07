import ConceptoList from '../../shared/Concepto/ConceptoList/ConceptoList'
import SearchBar from '../../shared/SeachBar/SearchBar'
import Boton from '../../shared/Boton/Boton'
import EtiquetaAutor from '../../shared/EtiquetaAutor/EtiquetaAutor'
import { conceptosPrueba } from '../../assets/conceptos_prueba'

import "./GlosarioAutor.css"

const GlosarioAutor = () => {
    return (
        <div>
            
            <EtiquetaAutor titulo_glosario="Glosario de Joselito"/>

            <div className="contenedor"> 
                <div className="space-search-bar">
                    <SearchBar />
                </div>
                <Boton className = "btn-categoria" label='Categorias' variant='action' />
            </div>

            <ConceptoList conceptos={conceptosPrueba} />
        </div>
    )
};

export default GlosarioAutor;