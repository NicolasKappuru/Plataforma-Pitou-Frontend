import "./ConceptoCard.css"
import MenuAcciones from "../../MenuAcciones/MenuAcciones"


const ConceptoCard = ({ concepto, titulo, descripcion, categoria, color, autor, onClick, onEliminar }) => {

  function convertirJsonATextoPlano(contenido) {
    if (!contenido || !contenido.content) {
        return "";
    }

    return contenido.content
        .map(parrafo => {
            if (!parrafo.content) return "";

            return parrafo.content
                .map(texto => texto.text || "")
                .join("");
        })
        .join(" ");
  }

  const texto_descripcion = convertirJsonATextoPlano(descripcion);

  const tagStyle = {
    backgroundColor: `${color}22`,
    color: color,
    borderColor: `${color}44`,
  }

  return (
    <div className="concepto-card" onClick={onClick}>
      <div className="concepto-card_dot" style={{ backgroundColor: color }} />

      <div className="concepto-card__body">
        <h3 className="concepto-card__titulo">{titulo}</h3>
        <p className="concepto-card__descripcion">{texto_descripcion}</p>
      </div>

      <div className="concepto-card__tags">
        <span className="concepto-card__tag" style={tagStyle}>{categoria}</span>
        {autor
          ? <span className="concepto-card__tag concepto-card__tag--secondary">{autor}</span>
          : <div className="concepto-card__menu"><MenuAcciones entidad="concepto" data={concepto} onEliminar={onEliminar} /></div>
        }
      </div>
    </div>
  )
}

export default ConceptoCard
