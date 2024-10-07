import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/homeEmpresa/AsideEmpresa";
import Dashboard from "../components/homeEmpresa/Dashboard";
import Statistics from "../components/homeEmpresa/Statistics";
import Faq from "../components/homeEmpresa/FAQ";
import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Produtos from "@/components/homeEmpresa/produtos";
import Envios from "../components/homeEmpresa/Envios";
import Rendimentos from "@/components/homeEmpresa/Rendimentos";
import Configuracao from "@/components/homeEmpresa/Settings";

const Perguntas = [
  {
    titulo: "1. Como faço para cadastrar um produto?",
    descricao:
      "Para cadastrar um produto, acesse o painel de dashboard e clique em Produto. Preencha as informações necessárias, como nome, preço, imagem (precisa ser uma URL/Link), e descrição. Lembre-se que usuários no plano básico só podem cadastrar um produto.",
  },
  {
    titulo: "2. Como faço para deletar um produto?",
    descricao:
      "Para deletar um produto, vá até a seção 'Produtos', localize o produto que deseja remover e clique no ícone de lixeira no lado direito do item que deseja remover.",
  },
  {
    titulo: "3. Como posso melhorar meu plano?",

    descricao:
      "Para melhorar o seu plano, vá até a seção Planos nas configurações ou nos 3 pontinhos e planos. Lá, você encontrará as opções disponíveis e poderá fazer o upgrade do seu plano atual para um com mais benefícios, como a possibilidade de cadastrar mais produtos.",
  },
  { 
    titulo:  "4. Posso cadastrar mais de um produto no plano básico?",
    descricao: "Não. O plano básico permite o cadastro de apenas um produto. Para adicionar mais produtos, você precisa fazer um upgrade para um plano superior."
  },  
  {
    titulo:"5. Como faço para excluir minha conta?",
    descricao: "Va para configurações e procure a opção de excluir minha conta. Clique no botão de excluir minha conta e confirme a exclusão."
  },
  {
    titulo:"6. Como posso sacar o dinheiro das minhas vendas?",
    descricao: "Para sacar o dinheiro das suas vendas, acesse a aba de rendimento na sua conta, verifique o saldo disponível e clique em Solicitar Saque. O dinheiro será transferido para a conta bancária cadastrada."
  },
];

function HomeEmpresa() {
  const location = useLocation();
  const redirectRoteHome = () =>
    location.pathname == "/Empresa/home" || location.pathname == "/Empresa/Home" || location.pathname == "/Empresa/"
      ? (location.pathname = "/Empresa/dashboard")
      : location.pathname;
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
          
          <Route path="Produtos" element={<Produtos />} />
          <Route path="envios" element={<Envios />} />
          <Route path="rendimento" element={<Rendimentos />} />
          <Route path="settings" element={<Configuracao />} />
          <Route path="faqs" element={<Faq perguntas={Perguntas} />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomeEmpresa;
