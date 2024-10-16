/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ChartFature } from "./Statistics/ChartFature";
import { Chartmultiple } from "./Statistics/ChartMultiple";
import { UnansweredReviews } from "./Statistics/UnansweredReviews";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Pergunta } from "@/interface/PerguntasProps";
import { GetEmpresa } from "@/interface/GetEmpresa";
import { ChartMoneyProps } from "@/interface/ChartMoney";

const data = [
  { month: "Janeiro", Compras: 186, Avaliacoes: 80 },
  { month: "Fevereiro", Compras: 305, Avaliacoes: 200 },
  { month: "Março", Compras: 237, Avaliacoes: 120 },
  { month: "Abril", Compras: 73, Avaliacoes: 190 },
  { month: "Maio", Compras: 209, Avaliacoes: 130 },
  { month: "Junho", Compras: 214, Avaliacoes: 140 },
  { month: "Julho", Compras: 250, Avaliacoes: 160 },
  { month: "Agosto", Compras: 300, Avaliacoes: 180 },
  { month: "Setembro", Compras: 280, Avaliacoes: 220 },
  { month: "Outubro", Compras: 310, Avaliacoes: 210 },
];

const MoneyData: ChartMoneyProps = {
  data: [
    { month: "Janeiro", Ganhos: 186.0 },
    { month: "Fevereiro", Ganhos: 305.5 },
    { month: "Março", Ganhos: 237.75 },
    { month: "Abril", Ganhos: 73.2 },
    { month: "Maio", Ganhos: 209.99 },
    { month: "Junho", Ganhos: 214.0 },
    { month: "Julho", Ganhos: 250.3 },
    { month: "Agosto", Ganhos: 300.4 },
    { month: "Setembro", Ganhos: 280.6 },
    { month: "Outubro", Ganhos: 310.8 },
  ],
};

function Statistics({ apiUrl }: GetEmpresa) {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const token = Cookies.get("Bearer");

  useEffect(() => {
    const getPerguntas = async (token: string) => {
      try {
        const response = await fetch(
          `${apiUrl}/Empresa/Comentario/NaoRespondida`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          return null;
        }
        const textResponse = await response.text();
        
        if(textResponse){
          const data = JSON.parse(textResponse);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      getPerguntas(token).then((data) => {
        if (data) {
          setPerguntas(data);
        } else {
          setPerguntas([
            {
              id: -1,
              titulo: "Nenhuma pergunta",
              pergunta: "",
            },
          ]);
        }
      });
    } else {
      Cookies.remove("Bearer");
      console.error("Token ausente");
      return navigate("/auth/login");
    }
  }, [apiUrl, navigate, token]);

  return (
    <>
      <h1 className="text-3xl mt-10 font-bold text-white">Estatísticas</h1>
      <div className="mt-10 mb-10 ml-5 flex flex-wrap justify-center items-center gap-7">
        <Chartmultiple data={data} />
        <UnansweredReviews perguntas={perguntas} />
      </div>
      <ChartFature data={MoneyData.data} />
    </>
  );
}

export default Statistics;
