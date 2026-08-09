import { BrowserRouter, Routes, Route } from "react-router-dom";

//De la aplicacion en general
import MainLayout from "../MainLayout/MainLayout"
import LoginView from "../LoginView/LoginView";


import VistaEspera from "../../modules/VistaEspera/VistaEspera";

//Opciones del sidebar
import GlosarioPropio from "../../modules/GlosarioPropio/GlosarioPropio"
import Explorar from "../../modules/Explorar/Explorar"
import BusquedaGeneral from "../../modules/BusquedaGeneral/BusquedaGeneral"
import Usuarios from "../../modules/Usuarios/Usuarios"
import Solicitudes from "../../modules/Solicitudes/Solicitudes";

//Seleccion dentro de los modulos
import CategoriasPropias from "../../modules/CategoriasPropias/CategoriasPropias";
import GlosarioAutor from "../../modules/GlosarioAutor/GlosarioAutor"
import FormularioConcepto from "../../modules/FormularioConcepto/FormularioConcepto";
import FormularioCategoria from "../../modules/FormularioCategoria/FormularioCategoria";
import VistaConceptoDetalle from "../../modules/VistaConceptoDetalle/VistaConceptoDetalle";
import VistaOrdenConceptos from "../../modules/VistaOrdenConceptos/VistaOrdenConceptos";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginView />} />

        <Route element={<MainLayout />}>
          <Route path="/espera" element={<VistaEspera />} />
          <Route path="/glosario/propio" element={<GlosarioPropio />} />
          <Route path="/glosario/explorar" element={<Explorar />} />
          <Route path="/glosario/busqueda" element={<BusquedaGeneral />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/solicitudes" element={<Solicitudes />} />

          <Route path="/glosario/categorias" element={<CategoriasPropias/>} />
          <Route path="/formulario/concepto" element={<FormularioConcepto/>} />  
          <Route path="/formulario/categoria" element={<FormularioCategoria/>} />  
          <Route path="/concepto/detalle" element={<VistaConceptoDetalle/>} />    
          <Route path="/ordenar/conceptos" element={<VistaOrdenConceptos/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;