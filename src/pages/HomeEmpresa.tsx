import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar, { SidebarItem } from "../components/homeEmpresa/AsideEmpresa";
import Dashboard from '../components/homeEmpresa/Dashboard'; 
import Statistics from '../components/homeEmpresa/Statistics'; 
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

function HomeEmpresa() {
    const location = useLocation(); // Obtém a localização atual

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
                    icon={<Boxes size={20} />}
                    text="Produtos"
                    path="/Empresa/Produtos"
                    active={location.pathname === "/Empresa/Produtos"}
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
            <div className="flex-1 fixed left-32 top-5">
                <Routes>

                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="user" element={<Statistics />} />
                    <Route path="Produtos" element={<Statistics />} />
                    <Route path="envios" element={<Statistics />} />
                    <Route path="rendimento" element={<Statistics />} />
                    <Route path="settings" element={<Statistics />} />
                    <Route path="faqs" element={<Statistics />} />
                </Routes>
            </div>
        </div>
    );
}

export default HomeEmpresa;
