import { useState } from "react"
import "./SolicitudList.css"
import Paginacion from "../../Paginacion/Paginacion"
import Boton from "../../Boton/Boton"
import { solicitudesPrueba } from "../../../assets/solicitudes_prueba"

const POR_PAGINA = 8

const COLORES_AVATAR = [
  '#7b8fc0', '#8bbfa0', '#b89ac0', '#c0a07b', '#7bb8c0',
  '#c07b8f', '#a0c07b', '#c07ba0', '#a0a07b',
]

const toHandle = (nombre) =>
  '@' + nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')

const SolicitudList = () => {
  const [estados, setEstados] = useState(
    () => Object.fromEntries(solicitudesPrueba.map((s) => [s.id, s.estado]))
  )
  const [paginaActual, setPaginaActual] = useState(1)

  const totalPaginas = Math.ceil(solicitudesPrueba.length / POR_PAGINA)
  const inicio = (paginaActual - 1) * POR_PAGINA
  const solicitudesPagina = solicitudesPrueba.slice(inicio, inicio + POR_PAGINA)

  const resolver = (id, decision) => {
    setEstados((prev) => ({ ...prev, [id]: decision }))
  }

  return (
    <div className="solicitud-list">
      <div className="solicitud-list__tabla">
        <div className="solicitud-list__header">
          <span>ID</span>
          <span>Autor</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        <div className="solicitud-list__body">
          {solicitudesPagina.map((s) => {
            const estado = estados[s.id]
            const pendiente = estado === "pendiente"
            const avatarColor = COLORES_AVATAR[s.id % COLORES_AVATAR.length]

            return (
              <div key={s.id} className="solicitud-list__fila">
                <span className="solicitud-list__id">#{s.id}</span>

                <div className="solicitud-list__autor">
                  <div
                    className="solicitud-list__avatar"
                    style={{ backgroundColor: `${avatarColor}22`, color: avatarColor }}
                  >
                    {s.autor[0]}
                  </div>
                  <div className="solicitud-list__info">
                    <span className="solicitud-list__nombre">{s.autor}</span>
                    <span className="solicitud-list__handle">{toHandle(s.autor)}</span>
                  </div>
                </div>

                <div>
                  <span className={`solicitud-list__estado solicitud-list__estado--${estado}`}>
                    <span className="solicitud-list__estado-dot" />
                    {estado}
                  </span>
                </div>

                <div className="solicitud-list__acciones">
                  {pendiente ? (
                    <>
                      <Boton
                        label="Aceptar"
                        variant="aceptar"
                        onClick={() => resolver(s.id, "aceptada")}
                      />
                      <Boton
                        label="Rechazar"
                        variant="rechazar"
                        onClick={() => resolver(s.id, "rechazada")}
                      />
                    </>
                  ) : (
                    <span className="solicitud-list__resuelta">—</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="solicitud-list__footer">
        <Paginacion
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onCambio={setPaginaActual}
        />
      </div>
    </div>
  )
}

export default SolicitudList
