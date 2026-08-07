import { useNavigate } from "react-router-dom";

import "./ConceptoList.css"
import ConceptoCard from "../ConceptoCard/ConceptoCard"
import Paginacion from "../../Paginacion/Paginacion"

const ConceptoList = ({ conceptos, paginaActual, totalPaginas, onCambioPagina, onEliminar }) => {
  const navigate = useNavigate()

  const handleSeleccionConcepto = (concepto) => {
    navigate("/concepto/detalle", {
      state: concepto
    })
  }

  return (
    <div className="concepto-list">
      <div className="concepto-list__items">
        {conceptos.map((c) => (
          <ConceptoCard
            key={c.id}
            concepto={c}
            titulo={c.titulo}
            descripcion={c.descripcion}
            categoria={c.categoria}
            color={c.color}
            autor={c.autor}
            onClick={() => handleSeleccionConcepto(c)}
            onEliminar={onEliminar}
          />
        ))}
      </div>
      <div className="concepto-list__footer">
        <Paginacion
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onCambio={onCambioPagina}
        />
      </div>
    </div>
  )
}

export default ConceptoList
