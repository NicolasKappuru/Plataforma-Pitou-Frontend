import "./GlosarioCard.css"

const ICONOS = [
  'ti-book', 'ti-books', 'ti-notebook', 'ti-bookmarks',
  'ti-pencil', 'ti-brain', 'ti-bulb', 'ti-stack', 'ti-list',
]

const COLORES = [
  '#7b8fc0', '#8bbfa0', '#b89ac0', '#c0a07b', '#7bb8c0',
  '#c07b8f', '#a0c07b', '#c07ba0', '#a0a07b',
]

const getIconoColor = (id) => ({
  icono: ICONOS[id % ICONOS.length],
  color: COLORES[id % COLORES.length],
})

const toHandle = (nombre) =>
  '@' + nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')

const GlosarioCard = ({ id, nombre, categorias, conceptos }) => {
  const { icono, color } = getIconoColor(id)
  const handle = toHandle(nombre)

  return (
    <div className="glosario-card" onClick={() => alert(`Glosario de ${nombre}`)}>
      <div className="glosario-card__header">
        <div
          className="glosario-card__icon"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <i className={`ti ${icono}`} />
        </div>
        <div className="glosario-card__autor">
          <span className="glosario-card__nombre">{nombre}</span>
          <span className="glosario-card__handle">{handle}</span>
        </div>
      </div>

      <div className="glosario-card__divider" />

      <div className="glosario-card__stats">
        <div className="glosario-card__stat">
          <i className="ti ti-folder" />
          <span>{categorias} categorías</span>
        </div>
        <div className="glosario-card__stat">
          <i className="ti ti-layout-list" />
          <span>{conceptos} conceptos</span>
        </div>
      </div>

    </div>
  )
}

export default GlosarioCard
