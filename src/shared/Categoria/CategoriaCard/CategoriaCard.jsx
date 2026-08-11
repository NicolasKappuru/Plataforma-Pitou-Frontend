import { useNavigate } from "react-router-dom"
import { useState } from "react";

import "./CategoriaCard.css"
import MenuAcciones from "../../MenuAcciones/MenuAcciones"

const CategoriaCard = ({ categoria, titulo, color, conceptos, esMia = false, onEliminar }) => {
  
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/glosario/propio?categoria=${categoria?.id ?? ""}`)
  }

  return (
    <div 
        className={`categoria-card ${menuAbierto ? "categoria-card--menu-abierto" : ""}`} 
        onClick={handleClick}
    >
        {esMia && 
          <div className="categoria-card__menu">
            <MenuAcciones
              entidad="categoría"
              data={categoria}
              onEliminar={onEliminar}
              onEstadoMenu={setMenuAbierto}
          />
          </div>}
      <div className="categoria-card__dot" style={{ backgroundColor: color }} />
      <div className="categoria-card__body">
        <h3 className="categoria-card__titulo">{titulo}</h3>
        <span className="categoria-card__meta">{conceptos} conceptos</span>
      </div>
    </div>
  )
}

export default CategoriaCard
