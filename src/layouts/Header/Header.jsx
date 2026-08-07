import "./Header.css"
import Boton from "../../shared/Boton/Boton"
import {useNavigate} from "react-router-dom"


const Header = () => {
  const navigate = useNavigate()

  function handleNav(path) {
    navigate(path);
  }

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__app-name">Pitou</span>
      </div>
      <div className="header__actions">
        <Boton label="Cerrar sesión" variant="logout" onClick={() => handleNav("/")} />
      </div>
    </header>
  )
}

export default Header
