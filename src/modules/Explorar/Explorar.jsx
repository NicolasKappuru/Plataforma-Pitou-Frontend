//Hace referencia a la opcion de explorar que manejamos en el sidebar

import SearchBar from '../../shared/SeachBar/SearchBar'
import GlosarioList from '../../shared/Glosario/GlosarioList/GlosarioList'

import { glosariosPrueba } from '../../assets/glosarios_prueba'

const Explorar = () => {
    return(
        <div>
            <SearchBar />
            <GlosarioList  />    
        </div>    
    )
};

export default Explorar; 