import { Vender } from "@/components/Vender";
import { VenderProps } from "@/interface/VenderProps";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Vendas() {
  const [produtos, setProdutos] = useState<VenderProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    const token = Cookies.get("Bearer");
    if (!token) {
      Cookies.remove("Bearer");
      console.error("Token ausente");
      return navigate("/auth/login");
    }
    const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
    const response = await fetch(
      `${apiUrl}/Produtos/api/getAllPendingProducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao obter os produtos:", response.statusText);
      return;
    }

    const data: VenderProps[] = await response.json();
    console.log(data);
    setProdutos(data);
    setLoading(false);
  };
   useEffect(() => {
     getAllProducts();
   }, []);

 
  return (
    <>
    <div className="flex  items-start justify-start ">
      
      <button onClick={() => navigate("/Empresa/dashboard")} className="bg-transparent rounded-full p-3 m-5 hover:bg-neutral-600 duration-500 " > <ArrowLeft size={20} color="white"  /> </button>
    </div>
    <div className="justify-center flex flex-wrap">
      {loading && <h1>Carregando...</h1>}

      {produtos.map((produto, index) => (
        <Vender 
          key={index}
          id={produto.id}
          name={produto.name}
          descricao={produto.descricao}
          preco={produto.preco}
          imagem={produto.imagem}
          marca={produto.marca}
          status={produto.status}
          idEmpresa={produto.empresa.id}
          empresa={produto.empresa}
        />
      ))}
    </div>
    </>
  );
}
