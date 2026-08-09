import { useEffect, useState } from "react";
import "./TablaOrdenConceptos.css";

const TablaOrdenConceptos = ({ conceptos, onCambioOrden }) => {

  const [ordenConceptos, setOrdenConceptos] = useState(
    [...conceptos].sort((a, b) => a.posicion - b.posicion)
  );


  useEffect(() => {
    setOrdenConceptos(
      [...conceptos].sort((a, b) => a.posicion - b.posicion)
    );
  }, [conceptos]);

  const handleFinalizarEdicion = (id, posicion) => {
    handleCambioPosicion(id, posicion);
  };

  const handleCambioPosicion = (id, nuevaPosicion) => {

    const posicion = Number(nuevaPosicion);

    if (!posicion || posicion < 1 || posicion > ordenConceptos.length) {
        return;
    }

    const nuevosConceptos = [...ordenConceptos];

    const indiceActual = nuevosConceptos.findIndex(
      (concepto) => concepto.id === id
    );

    const [conceptoMovido] = nuevosConceptos.splice(indiceActual, 1);

    nuevosConceptos.splice(posicion - 1, 0, conceptoMovido);

    const conceptosActualizados = nuevosConceptos.map((concepto, index) => ({
      ...concepto,
      posicion: index + 1
    }));

    setOrdenConceptos(conceptosActualizados);

    if (onCambioOrden) {
      onCambioOrden(conceptosActualizados);
    }
  };


  return (
    <table className="tabla-orden-conceptos">
      <thead>
        <tr>

          <th>Posición</th>
          <th>Nombre concepto</th>
          
        </tr>
      </thead>

      <tbody>
        {ordenConceptos.map((concepto) => (
          <tr key={concepto.id}>
           
            <td>
              
            <input
              type="number"
              min="1"
              max={ordenConceptos.length}
              value={concepto.posicion}
              onChange={(e) => {

                const nuevosConceptos = ordenConceptos.map((c) =>
                  c.id === concepto.id
                    ? { ...c, posicion: e.target.value }
                    : c
                );

                setOrdenConceptos(nuevosConceptos);

              }}
              onBlur={(e) =>
                handleFinalizarEdicion(
                  concepto.id,
                  e.target.value
                )
              }
            />        
            </td>
             <td>
              {concepto.titulo}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaOrdenConceptos;