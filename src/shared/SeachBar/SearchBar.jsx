import { useState } from "react"
import "./SearchBar.css"

const SearchBar = ({ placeholder = "Buscar...", onSearch }) => {
  const [valor, setValor] = useState("")

  const ejecutarBusqueda = () => {
    if (valor.trim()) onSearch?.(valor.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") ejecutarBusqueda()
  }

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button className="search-bar__btn" onClick={ejecutarBusqueda}>
        <i className="ti ti-search" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SearchBar
