import { useState } from "react"
import "./UsuarioList.css"
import Paginacion from "../../Paginacion/Paginacion"
import Boton from "../../Boton/Boton"
import { usuariosPrueba } from "../../../assets/usuarios_prueba"

const POR_PAGINA = 10

const COLORES_AVATAR = [
  '#7b8fc0', '#8bbfa0', '#b89ac0', '#c0a07b', '#7bb8c0',
  '#c07b8f', '#a0c07b', '#c07ba0', '#a0a07b',
]

const ROL_COLOR = {
  admin:      '#7b8fc0',
  moderador:  '#b89ac0',
  estudiante: '#8bbfa0',
}

const toHandle = (nombre) =>
  '@' + nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')

const UsuarioList = () => {
  const [bloqueados, setBloqueados] = useState(new Set())
  const [paginaActual, setPaginaActual] = useState(1)

  const totalPaginas = Math.ceil(usuariosPrueba.length / POR_PAGINA)
  const inicio = (paginaActual - 1) * POR_PAGINA
  const usuariosPagina = usuariosPrueba.slice(inicio, inicio + POR_PAGINA)

  const toggleBloqueo = (id) => {
    setBloqueados((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="usuario-list">
      <div className="usuario-list__tabla">
        <div className="usuario-list__header">
          <span>Usuario</span>
          <span>Rol</span>
          <span>Glosario</span>
          <span>Estado</span>
          <span>Acción</span>
        </div>

        <div className="usuario-list__body">
          {usuariosPagina.map((u) => {
            const bloqueado = bloqueados.has(u.id)
            const avatarColor = COLORES_AVATAR[u.id % COLORES_AVATAR.length]
            const rolColor = ROL_COLOR[u.rol]

            return (
              <div key={u.id} className="usuario-list__fila">
                <div className="usuario-list__usuario">
                  <div
                    className="usuario-list__avatar"
                    style={{ backgroundColor: `${avatarColor}22`, color: avatarColor }}
                  >
                    {u.nombre[0]}
                  </div>
                  <div className="usuario-list__info">
                    <span className="usuario-list__nombre">{u.nombre}</span>
                    <span className="usuario-list__handle">{toHandle(u.nombre)}</span>
                  </div>
                </div>

                <div>
                  <span
                    className="usuario-list__badge"
                    style={{
                      backgroundColor: `${rolColor}22`,
                      color: rolColor,
                      borderColor: `${rolColor}44`,
                    }}
                  >
                    {u.rol}
                  </span>
                </div>

                <div>
                  {u.tieneGlosario
                    ? <span className="usuario-list__glosario usuario-list__glosario--si"><i className="ti ti-check" /> Sí</span>
                    : <span className="usuario-list__glosario usuario-list__glosario--no"><i className="ti ti-x" /> No</span>
                  }
                </div>

                <div>
                  <span className={`usuario-list__estado usuario-list__estado--${u.estado}`}>
                    <span className="usuario-list__estado-dot" />
                    {u.estado}
                  </span>
                </div>

                <div>
                  <Boton
                    label={bloqueado ? 'Desbloquear' : 'Bloquear'}
                    variant={bloqueado ? 'desbloquear' : 'bloquear'}
                    onClick={() => toggleBloqueo(u.id)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="usuario-list__footer">
        <Paginacion
          totalPaginas={totalPaginas}
          paginaActual={paginaActual}
          onCambio={setPaginaActual}
        />
      </div>
    </div>
  )
}

export default UsuarioList
