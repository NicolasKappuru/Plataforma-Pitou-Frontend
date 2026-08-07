import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import buscarCategorias from "./services/service_buscar_categorias";
import "./CategoriaSelector.css";

const normalizarCategoria = (value) => {
  if (!value) return null;

  if (typeof value === "object") {
    return {
      id: value.id,
      titulo: value.titulo_categoria || value.titulo || value.nombre || "",
      color: value.color || "#7b8fc0",
      glosario: value.glosario ?? 1,
    };
  }

  return {
    id: undefined,
    titulo: String(value),
    color: "#7b8fc0",
    glosario: 1,
  };
};

const CategoriaSelector = ({ onSelect, value }) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => normalizarCategoria(value));
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelected(normalizarCategoria(value));
  }, [value]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        setLoading(true);
        const data = await buscarCategorias({ palabra: query, glosario: 1 });

        const normalizadas = (Array.isArray(data) ? data : []).map((categoria) => ({
          id: categoria.id,
          titulo: categoria.titulo_categoria || categoria.titulo || categoria.nombre || "",
          color: categoria.color || "#7b8fc0",
          glosario: categoria.glosario ?? 1,
        }));

        setCategorias(normalizadas);

        if (selected?.titulo) {
          const coincide = normalizadas.find((cat) => {
            const mismoId = selected.id != null && cat.id != null && cat.id === selected.id;
            const mismoTitulo = cat.titulo?.toLowerCase() === selected.titulo.toLowerCase();
            return mismoId || mismoTitulo;
          });

          if (coincide) {
            setSelected(coincide);
            onSelect?.(coincide);
          }
        }
      } catch (error) {
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = window.setTimeout(cargarCategorias, 300);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="select-container">
      <Combobox
        value={selected}
        onChange={(valor) => {
          setSelected(valor);
          onSelect?.(valor);
        }}
      >
        <div className="select-field">
          <Combobox.Input
            className="select-input"
            displayValue={(cat) => cat?.titulo || ""}
            value={query || selected?.titulo || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar categoría..."
            autoComplete="off"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            data-form-type="other"
          />

          {selected && (
            <span
              className="selected-category-tag"
              style={{
                backgroundColor: `${selected.color}22`,
                color: selected.color,
                borderColor: `${selected.color}44`,
              }}
            >
              {selected.titulo}
            </span>
          )}
        </div>

        <Combobox.Options className="select-options">
          {loading ? (
            <div className="no-results">Buscando categorías...</div>
          ) : categorias.length === 0 ? (
            <div className="no-results">Sin resultados</div>
          ) : (
            categorias.map((cat) => (
              <Combobox.Option
                key={cat.id}
                value={cat}
                className="select-option"
              >
                {({ active, selected }) => (
                  <div
                    className={`option-content ${
                      active ? "active" : ""
                    }`}
                  >
                    <div className="option-main">
                      <span
                        className="category-tag"
                        style={{
                          backgroundColor: `${cat.color}22`,
                          color: cat.color,
                          borderColor: `${cat.color}44`,
                        }}
                      >
                        {cat.titulo}
                      </span>
                    </div>

                    {selected && <span className="option-check">✓</span>}
                  </div>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default CategoriaSelector;