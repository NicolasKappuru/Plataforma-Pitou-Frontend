import "./CategoriaList.css"

import CategoriaCard from "../CategoriaCard/CategoriaCard"
import Paginacion from "../../Paginacion/Paginacion"



const CategoriaList = ({
    categorias,
    paginaActual,
    totalPaginas,
    onCambioPagina,
    onEliminar
}) => {


    return (

        <div className="categoria-list">


            <div className="categoria-list__items">


                {categorias.map((categoria) => (

                    <CategoriaCard

                        key={categoria.id}

                        categoria={categoria}

                        titulo={categoria.titulo}

                        color={categoria.color}

                        conceptos={categoria.conceptos}

                        esMia={categoria.esMia}

                        onEliminar={onEliminar}

                    />

                ))}


            </div>





            <div className="categoria-list__footer">


                <Paginacion

                    totalPaginas={totalPaginas}

                    paginaActual={paginaActual}

                    onCambio={onCambioPagina}

                />


            </div>



        </div>

    );

};


export default CategoriaList;