import { useState } from "react"
import "./GlosarioList.css"
import GlosarioCard from "../GlosarioCard/GlosarioCard"
import Paginacion from "../../Paginacion/Paginacion"
import { glosariosPrueba } from "../../../assets/glosarios_prueba"

const POR_PAGINA = 9

const GlosarioList = () => {
  const [paginaActual, setPaginaActual] = useState(1)

  const totalPaginas = Math.ceil(glosariosPrueba.length / POR_PAGINA)
  const inicio = (paginaActual - 1) * POR_PAGINA
  const glosariosPagina = glosariosPrueba.slice(inicio, inicio + POR_PAGINA)

  return (
    <div className="glosario-list">
      <div className="glosario-list__items">
        {glosariosPagina.map((g) => (
          <GlosarioCard
            key={g.id}
            id={g.id}
            nombre={g.nombre}
            categorias={g.categorias}
            conceptos={g.conceptos}
          />
        ))}
      </div>
      <div className="glosario-list__footer">
        <Paginacion
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onCambio={setPaginaActual}
        />
      </div>
    </div>
  )
}

export default GlosarioList
