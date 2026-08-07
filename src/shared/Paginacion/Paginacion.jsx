import "./Paginacion.css"

const generarPaginas = (total, actual) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const paginas = [1]

  if (actual > 3) paginas.push("...")

  const desde = Math.max(2, actual - 1)
  const hasta = Math.min(total - 1, actual + 1)
  for (let i = desde; i <= hasta; i++) paginas.push(i)

  if (actual < total - 2) paginas.push("...")

  paginas.push(total)
  return paginas
}

const Paginacion = ({ totalPaginas, paginaActual, onCambio }) => {
  const paginas = generarPaginas(totalPaginas, paginaActual)

  return (
    <div className="paginacion">
      <button
        className="paginacion__btn"
        onClick={() => onCambio(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        <i className="ti ti-chevron-left" />
      </button>

      {paginas.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="paginacion__puntos">...</span>
        ) : (
          <button
            key={p}
            className={`paginacion__btn ${p === paginaActual ? "paginacion__btn--activo" : ""}`}
            onClick={() => onCambio(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        className="paginacion__btn"
        onClick={() => onCambio(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        <i className="ti ti-chevron-right" />
      </button>
    </div>
  )
}

export default Paginacion
