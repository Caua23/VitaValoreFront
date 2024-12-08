/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ShoppingBasket, PiggyBank } from "lucide-react";
import { Button } from "../ui/button";
import DataTable from "./Dashbord/dataTable";
import FooterEmpresa from "./footerEmpresa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GetEmpresa } from "@/interface/GetEmpresa";
import { VendasProps } from "@/interface/VendasProps";
import { ChartDataDashbord } from "@/interface/ChartDataDashbord";

const chartConfig = {
  views: {
    label: "Compras",
  },
  Compras: {
    label: "Compras",
    color: "#8300ff",
  },
  Avaliacao: {
    label: "Avaliacao",
    color: "#fbff00",
  },
} satisfies ChartConfig;

function Dashboard({ id, wallet, apiUrl }: GetEmpresa) {
  const [ultimasVendasData, setUltimasVendasData] = React.useState<
    VendasProps[]
  >([]);
  const [chartData, setChartData] = React.useState<ChartDataDashbord[]>([]);
  const navigate = useNavigate();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Compras");
  const [mostReviewed, setMostReviewed] = React.useState<string | null>(null);
  const [moreSold, setMoreSold] = React.useState<string | null>(null);
  const total = React.useMemo(
    () => ({
      Compras: chartData.reduce((acc, curr) => acc + curr.Compras, 0),
      Avaliacao: chartData.reduce((acc, curr) => acc + curr.Avaliacao, 0),
    }),
    []
  );
  const maisVendido = async () => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        Cookies.remove("Bearer");
        console.error("Token ausente");
        return navigate("/auth/login");
      }

      const response = await fetch(`${apiUrl}/Empresa/${id}/vendas/topVendas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Erro na resposta da API", response.status);
        return;
      }

      const textResponse = await response.text();
      if (!textResponse) {
        return setMostReviewed(null);
      }

      const data = JSON.parse(textResponse);
      return data;
    } catch (error) {
      console.error("Erro ao buscar mais vendido:", error);
    }
  };

  const ultimasVendas = async () => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        Cookies.remove("Bearer");
        console.error("Token ausente");

        return navigate("/auth/login");
      }
      const response = await fetch(`${apiUrl}/Empresa/${id}/vendas/recentes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const textResponse = await response.text();
      if (!response.ok) {
        console.error("Erro na resposta da API", response.status);
        return;
      }

      if (!textResponse) {
        return setMoreSold;
      }

      const data = JSON.parse(textResponse);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const maisAvaliado = async () => {
    try {
      const token = Cookies.get("Bearer");
      if (!token) {
        Cookies.remove("Bearer");
        console.error("Token ausente");

        return navigate("/auth/login");
      }

      const response = await fetch(
        `${apiUrl}/Empresa/Comentario/MaisAvaliados/${id}`,
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

  React.useEffect(() => {
    const fetchMostReviewed = async () => {
      const product = await maisAvaliado();
      return product && product.length > 0 ? setMostReviewed(product[0].name) : null;
    };
  
    const fetchVendas = async () => {
      const data = await ultimasVendas();
      if (data) {
        const ultimasVendasJson = MappingData(data);
        return setUltimasVendasData(ultimasVendasJson);
      }
    };
  
    const fetchMostSold = async () => {
      const product = await maisVendido();
      return product && product.length > 0 ? setMoreSold(product[0][0].name) : null;
    };
  
    const fetchTrimestral = async () => {
      const data = await trimestral();
      if (data) {
        const sortedData = [...data].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        return setChartData(sortedData);
      }
    };
  
    // Chamadas das funções
    fetchTrimestral();
    fetchMostSold();
    fetchVendas();
    fetchMostReviewed();
  }, []);
  

  function MappingData(
    data: {
      id: string;
      produtos: {
        name: string;
        preco: number;
      };
      statusPagamento:
          | "PENDENTE"
          | "REJEITADO"
          | "PROCESSANDO"
          | "APROVADO"
          | "CANCELADO";

    }[]
  ) {
    return data.map((item) => {
      const venda = {
        id: item.id.toString(),
        produto: item.produtos.name,
        pago: item.produtos.preco,
        status: item.statusPagamento,
      };
      return venda;
    });
  }

  return (
    <>
      <section className="grid  grid-cols-2">
        <Card className="h-1200px border-none mt-2 ml-2 rounded-3xl p-4 bg-black">
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-black">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle className="text-neutral-100">Vendas do mês</CardTitle>
              <CardDescription className="text-neutral-200">
                total de Compras dos últimos 3 meses
              </CardDescription>
            </div>
            <div className="flex">

              {["Compras", "Avaliacao"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className=" text-neutral-200 rounded-t-md relative z-2 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground  text-neutral-200">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <BarChart
                className=""
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("pt-br", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />

                <ChartTooltip
                  animationDuration={200}
                  content={
                    <ChartTooltipContent
                      className="w-[150px] bg-zinc-200"
                      nameKey="views"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-br", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Bar
                  dataKey={activeChart}
                  fill={`var(--color-${activeChart})`}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className=" mt-10  ">
          </CardFooter>
        </Card>
        <div className="flex flex-wrap justify-center items-center gap-4 m-5 max-w-full">
          <div className="flex flex-col items-center  min-w-[320px] w-full  bg-black h-60 p-10  text-start rounded-3xl">
            <div className="w-full">
              <PiggyBank size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 text-xs">Seus ganhos foram:</p>
              <p className="font-bold mt-2 text-3xl">R$ {wallet.toFixed(2)}</p>
              <a href="/Empresa/rendimento" className="">
                <Button
                  variant="secondary"
                  className="p-5 mt-3 w-52 hover:bg-purple-800 duration-700 bg-purple-primary text-neutral-50 font-semibold"
                >
                  Sacar
                </Button>
              </a>
            </div>
          </div>

          {moreSold && (
            <div className="flex-1 min-w-[220px] justify-center bg-black h-64 p-10 items-center rounded-3xl">
              <ShoppingBasket size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 mt-2 text-xs">
                Produto mais vendido:
              </p>
              <p className="font-semibold mt-2 text-xl text-wrap w-[200px]">
                {moreSold}
              </p>
            </div>
          )}

          {mostReviewed && (
            <div className="flex-1 min-w-[220px] h-64 justify-center bg-black  p-10 items-center rounded-3xl">
              <ShoppingBasket size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 mt-2 text-xs">
                Produto mais bem avaliado:
              </p>
              <p className="font-semibold mt-2 text-xl text-wrap w-[200px]">
                {mostReviewed}
              </p>
            </div>
          )}
        </div>
      </section>

      <DataTable data={ultimasVendasData} />

      <FooterEmpresa />
    </>
  );
}

export default Dashboard;
