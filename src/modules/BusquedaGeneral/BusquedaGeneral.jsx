import ConceptoList from '../../shared/Concepto/ConceptoList/ConceptoList'
import SearchBar from '../../shared/SeachBar/SearchBar'
import { conceptosPrueba } from '../../assets/conceptos_prueba'


const BusquedaGeneral = () => {
    return (
        <div>
            <SearchBar />
            <ConceptoList conceptos={conceptosPrueba} />
        </div>
    )
};

export default BusquedaGeneral;