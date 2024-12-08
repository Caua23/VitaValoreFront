import { VenderProps } from "@/interface/VenderProps";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { randomInt } from "crypto";

export function Vender({
  id,
  name,
  descricao,
  preco,
  imagem,
  marca,
  idEmpresa,
}: VenderProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;

  const comprar = async (e: React.FormEvent) => {
    const token = Cookies.get("Bearer");
    if (!token) {
      Cookies.remove("Bearer");
      console.error("Token ausente");
      return navigate("/auth/login");
    }

    const venda = {
      produtosId: id,
      empresasId: idEmpresa,
      quantidade: Math.random() * (10 - 1) + 1,
      valorPago: preco,
      status: "PENDENTE",
    };

    e.preventDefault();
    setLoading(true);   

    try {
      const response = await fetch(`${apiUrl}/user/Comprar/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(venda),
      });

      if (!response.ok) {
        throw new Error("Erro ao comprar o produto");
      }

      alert("Compra realizada com sucesso!");
      console.log("Compra realizada com sucesso!"); 
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar a compra.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form
      onSubmit={comprar}
      className="flex flex-col gap-4 justify-between bg-neutral-700 p-4 rounded-2xl w-auto h-[2000px ] m-5 "
    >
      <div className="flex justify-center">
        <img src={imagem} alt={name} className="rounded-md h-72" />
      </div>
      <h1 className="font-semibold">{name}</h1>
      <p className="max-w-[500px] text-wrap">
        <strong>Descrição:</strong> <br /> {descricao}
      </p>
      <p className="text-neutral-400">Marca: {marca}</p>
      <p className="font-semibold text-2xl text-green-600">R$ {preco}</p>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading} 
      >
        {loading ? "Carregando..." : "Comprar"}
      </button>
    </form>
  );
}
