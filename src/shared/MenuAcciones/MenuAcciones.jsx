import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./MenuAcciones.css"
import Boton from "../Boton/Boton"
import eliminarConcepto from "../MensajeConfirmacion/services/service_eliminar_concepto"
import eliminarCategoria from "../MensajeConfirmacion/services/service_eliminar_categoria"

const MenuAcciones = ({ entidad, data, concepto, onEliminar, onEstadoMenu }) => {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const entidadData = data ?? concepto

  useEffect(() => {
    const cerrar = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener("mousedown", cerrar)
    return () => document.removeEventListener("mousedown", cerrar)
  }, [])

  const toggle = (e) => {
      e.stopPropagation()

      setAbierto((prev) => {
          const nuevoEstado = !prev
          onEstadoMenu?.(nuevoEstado)
          return nuevoEstado
      })
  }

  const nombreEntidad = typeof entidad === "string" ? entidad : "concepto"

  const handleAccion = (e, accion) => {
    e.stopPropagation()
    setAbierto(false)

    if (accion === "Editar") {
      const lower = String(entidad || "").toLowerCase();
      if (lower.includes("categoria") || lower.includes("categor")) {
        navigate("/formulario/categoria", { state: 
          { modo: "editar", 
            categoria: entidadData,
            returnTo: location.pathname + location.search
          } })
        return
      }

      navigate("/formulario/concepto", {
          state: {
              modo: "editar",
              concepto: entidadData,
              returnTo: location.pathname + location.search
          }
      })
      
      return
    }

    if (accion === "Eliminar") {
      void eliminarEntidad()
    }
  }

  const eliminarEntidad = async () => {
    try {
      if (!entidadData?.id) {
        throw new Error("No hay ID para eliminar")
      }

      const lower = String(entidad || "").toLowerCase()
      const esCategoria = lower.includes("categoria") || lower.includes("categor")

      if (esCategoria) {
        await eliminarCategoria(entidadData.id)
      } else {
        await eliminarConcepto(entidadData.id)
      }

      await onEliminar?.()
    } catch (error) {
      console.error("No se pudo eliminar:", error)
      alert("No se pudo eliminar el elemento")
    }
  }

  const handleOrdenarConceptos = (e) => {
    e.stopPropagation();
    setAbierto(false);
    console.log(entidadData);
    navigate("/ordenar/conceptos", {
      
      state: {
        categoria: entidadData
      }
    });
  };

  return (
    <div className="menu-acciones" ref={ref}>
      <button className="menu-acciones__trigger" onClick={toggle}>
        <i className="ti ti-dots" />
      </button>

      {abierto && (
        <div className="menu-acciones__dropdown">
          <Boton
            label={`Editar ${nombreEntidad}`}
            icon="pencil"
            variant="sidebar"
            onClick={(e) => handleAccion(e, "Editar")}
          />
          <Boton
            label={`Eliminar ${nombreEntidad}`}
            icon="trash"
            variant="sidebar"
            onClick={(e) => handleAccion(e, "Eliminar")}
          />

           {String(entidad).toLowerCase().includes("categor") && (
            <Boton
              label="Ordenar conceptos"
              icon="list"
              variant="sidebar"
              onClick={handleOrdenarConceptos}
            />
          )}
          
        </div>
      )}

    </div>
  )
}

export default MenuAcciones
