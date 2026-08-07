import { Outlet } from "react-router-dom";
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import "./MainLayout.css"

const MainLayout = () => {
   return (
      <div className="main-layout">
         <Header />

         <div className="main-layout__body">
            <Sidebar />

            <main className="main-layout__content">
               <Outlet />
            </main>

         </div>
      </div>
   );
};

export default MainLayout;