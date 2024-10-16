/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import { Envios } from "@/components/homeEmpresa/Envios";
import Rendimentos from "@/components/homeEmpresa/Rendimentos";
import Configuracao from "@/components/homeEmpresa/Settings";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
    titulo: "4. Posso cadastrar mais de um produto no plano básico?",
    descricao:
      "Não. O plano básico permite o cadastro de apenas um produto. Para adicionar mais produtos, você precisa fazer um upgrade para um plano superior.",
  },
  {
    titulo: "5. Como faço para excluir minha conta?",
    descricao:
      "Va para configurações e procure a opção de excluir minha conta. Clique no botão de excluir minha conta e confirme a exclusão.",
  },
  {
    titulo: "6. Como posso sacar o dinheiro das minhas vendas?",
    descricao:
      "Para sacar o dinheiro das suas vendas, acesse a aba de rendimento na sua conta, verifique o saldo disponível e clique em Solicitar Saque. O dinheiro será transferido para a conta bancária cadastrada.",
  },
];
function HomeEmpresa() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [nameEmpresa, setNameEmpresa] = useState("");
  const [emailEmpresa, setEmailEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [wallet, setWallet] = useState(0);
  const [apiUrlEnviar, setApiUrlEnviar] = useState("");
  const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
  const token = Cookies.get("Bearer");
  useEffect(() => {
    if (!token) {
      logout();
    } else {
      getEmpresa();
    }
  }, [token]);

  const logout = async () => {
    Cookies.remove("Bearer");
    navigate("/auth/login");
  };

  const getEmpresa = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/Empresa/verification/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao verificar o token");
      }

      const data = await response.json();
      if (id !== data.id) setId(data.id);
      if (nameEmpresa !== data.name) setNameEmpresa(data.name);
      if (emailEmpresa !== data.email) setEmailEmpresa(data.email);
      if (wallet !== data.wallet) setWallet(data.wallet);
      if (cnpj !== data.cnpj) setCnpj(data.cnpj);
      setApiUrlEnviar(apiUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apiUrl) {
      console.error("API URL não configurada");
      return;
    }

    getEmpresa();
  }, [apiUrl]);

  useEffect(() => {
    const redirectMap: Record<string, string> = {
      "/Empresa/home": "/Empresa/dashboard",
      "/empresa/home": "/Empresa/dashboard",
      "/empresa/Home": "/Empresa/dashboard",
      "/Empresa/Home": "/Empresa/dashboard",
      "/empresa/": "/Empresa/dashboard",
      "/empresa": "/Empresa/dashboard",
      "/Empresa/": "/Empresa/dashboard",
      "/Empresa/Faqs": "/Empresa/faqs",
      "/Empresa/produtos": "/Empresa/Produtos",
      "/Empresa/Pergunta/-1": "/Empresa/statistics",
      "/Empresa/Pergunta/": "/Empresa/statistics",
      "/Empresa/Statistics": "/Empresa/statistics",
    };

    const targetPath = redirectMap[location.pathname];

    if (targetPath) {
      navigate(targetPath);
    }
  }, [location.pathname, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <aside className="flex flex-col gap-4 my-5 m-5 mt-7 ">
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group" />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group" />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group" />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group" />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group " />
          <Skeleton className="border-gray-700   border-t w-12 " />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex i  tems-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group " />
          <Skeleton className="bg-gray-700 h-12 w-12 select-none relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group " />
          <div className="mt-6">
            <Skeleton className="bg-gray-700  h-12 w-12 rounded-full" />
          </div>
        </aside>
        <main className="flex gap-4 my-5 m-3">
          <Skeleton className="bg-gray-700 w-[700px] h-[500px] border-none mt-2 ml-2 rounded-3xl p-4 " />
          <div className=" flex flex-col gap-5">
            <Skeleton className="bg-gray-700 w-[480px] h-[200px] border-none mt-2 ml-2 rounded-3xl p-4 " />
            <Skeleton className="bg-gray-700 w-[480px] h-[200px] border-none mt-2 ml-2 rounded-3xl p-4 " />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar
        id={id}
        nameEmpresa={nameEmpresa}
        emailEmpresa={emailEmpresa}
        apiUrl={apiUrlEnviar}
      >
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
          text="Estatísticas"
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
          text="Configurações"
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
      <div className="flex-1 ml-32 mt-5 h-screen">
        <Routes>
          <Route
            path="dashboard"
            element={
              <Dashboard
                id={id}
                wallet={wallet}
                nome={nameEmpresa}
                email={emailEmpresa}
                cnpj={cnpj}
                apiUrl={apiUrlEnviar}
              />
            }
          />
          <Route
            path="statistics"
            element={
              <Statistics
                id={id}
                wallet={wallet}
                nome={nameEmpresa}
                email={emailEmpresa}
                cnpj={cnpj}
                apiUrl={apiUrlEnviar}
              />
            }
          />
          <Route
            path="Produtos"
            element={
              <Produtos
                id={id}
                wallet={wallet}
                nome={nameEmpresa}
                email={emailEmpresa}
                cnpj={cnpj}
                apiUrl={apiUrlEnviar}
              />
            }
          />
          <Route path="envios"
            element={
              <Envios
                id={id}
                wallet={wallet}
                nome={nameEmpresa}
                email={emailEmpresa}
                cnpj={cnpj}
                apiUrl={apiUrlEnviar} />
            } />
          <Route
            path="rendimento"
            element={
              <Rendimentos
                id={id}
                wallet={wallet}
                nome={nameEmpresa}
                email={emailEmpresa}
                cnpj={cnpj}
                apiUrl={apiUrlEnviar}
              />
            }
          />
          <Route path="settings" element={<Configuracao id={id}
            wallet={wallet}
            nome={nameEmpresa}
            email={emailEmpresa}
            cnpj={cnpj}
            apiUrl={apiUrlEnviar} />} />
          <Route path="faqs" element={<Faq perguntas={Perguntas} />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomeEmpresa;
