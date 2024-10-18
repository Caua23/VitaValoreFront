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
import { ChartMultipleProps } from "@/interface/ChartMultiple";

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

function Statistics({ apiUrl, id }: GetEmpresa) {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [chartData, setChartData] = useState<ChartMultipleProps>({ data: [] });

  const token = Cookies.get("Bearer");

  const meses: Record<number, string> = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

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
        if (textResponse) {
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
          setPerguntas([{ id: -1, titulo: "Nenhuma pergunta", pergunta: "" }]);
        }
      });
    } else {
      Cookies.remove("Bearer");
      console.error("Token ausente");
      return navigate("/auth/login");
    }
  }, [apiUrl, navigate, token]);

  const trimestral = async () => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        Cookies.remove("Bearer");
        console.error("Token ausente");
        return navigate("/auth/login");
      }

      const response = await fetch(
        `${apiUrl}/Empresa/${id}/vendas/trimestral`,
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
      const responseText = await response.text();
      if (!responseText) {
        return null;
      }
      const data = JSON.parse(responseText);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchTrimestral = async () => {
      const data = await trimestral();
      const mappedData = MappingData(data);
      setChartData({ data: mappedData });
    };

    fetchTrimestral();
  }, []);

  function MappingData(data: { Avaliacao: number; Compras: number; date: string }[]) {
    return data.map((item) => {
      const mesNumero = parseInt(item.date.substring(5, 7), 10); // Extrai o mês como número

      return {
        month: meses[mesNumero], 
        Compras: item.Compras,
        Avaliacao: item.Avaliacao,
      };
    });
  }

  return (
    <>
      <h1 className="text-3xl mt-10 font-bold text-white">Estatísticas</h1>
      <div className="mt-10 mb-10 ml-5 flex flex-wrap justify-center items-center gap-7">
        <Chartmultiple data={chartData.data.length > 1 ? chartData.data : []} />
        <UnansweredReviews perguntas={perguntas} />
      </div>
      <ChartFature data={MoneyData.data} />
    </>
  );
}

export default Statistics;
