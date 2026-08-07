import "./Sidebar.css"

import Boton from '../../shared/Boton/Boton'
import {navItems} from './navItems'
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const rolActual = "administrador";
  const navigate = useNavigate(); 

  const itemsFiltrados = navItems.filter(item =>
    item.roles.includes(rolActual)
  );

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <nav className="sidebar">
      {itemsFiltrados.map(item => (
        <Boton
          key={item.id}
          label={item.label}
          icon={item.icon}
          variant="sidebar"
          onClick={() => handleNav(item.path)}        />
      ))}
    </nav>
  );
};

export default Sidebar; 