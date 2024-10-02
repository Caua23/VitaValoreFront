import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/homeEmpresa/AsideEmpresa";
import Dashboard from "../components/homeEmpresa/Dashboard";
import Statistics from "../components/homeEmpresa/Statistics";
import UserData from "../components/homeEmpresa/User";  
import Faq from "../components/homeEmpresa/FAQ";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Produtos from "@/components/homeEmpresa/produtos";
import Envios from "../components/homeEmpresa/Envios";
import Rendimentos from "@/components/homeEmpresa/Rendimentos";


function HomeEmpresa() {
  const location = useLocation(); 
  const redirectRoteHome = () => location.pathname == "/Empresa/home" ? location.pathname = "/Empresa/dashboard" : location.pathname;
  redirectRoteHome(); 
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          path="/Empresa/dashboard"
          active={location.pathname === "/Empresa/dashboard"}
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Produtos"
          path="/Empresa/Produtos"
          active={location.pathname === "/Empresa/Produtos"}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Estatisticas"
          path="/Empresa/statistics"
          active={location.pathname === "/Empresa/statistics"}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Users"
          path="/Empresa/user"
          active={location.pathname === "/Empresa/user"}
        />
        
        <SidebarItem
          icon={<Package size={20} />}
          text="Envios"
          alert
          path="/Empresa/envios"
          active={location.pathname === "/Empresa/envios"}
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Rendimento"
          path="/Empresa/rendimento"
          active={location.pathname === "/Empresa/rendimento"}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="configurações"
          path="/Empresa/settings"
          active={location.pathname === "/Empresa/settings"}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="FAQs"
          path="/Empresa/faqs"
          active={location.pathname === "/Empresa/faqs"}
        />
      </Sidebar>
      <div className="flex-1 ml-32 mt-5  h-screen">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="user" element={<UserData />} />
          <Route path="Produtos" element={<Produtos />} />
          <Route path="envios" element={<Envios />} />
          <Route path="rendimento" element={<Rendimentos />} />
          <Route path="settings" element={<Settings />} />
          <Route path="faqs" element={<Faq />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomeEmpresa;
