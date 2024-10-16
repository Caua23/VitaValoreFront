
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

const chartData = [
  { date: "2024-04-01", Compras: 222, Avaliacao: 150 },
  { date: "2024-04-02", Compras: 97, Avaliacao: 80 },
  { date: "2024-04-03", Compras: 167, Avaliacao: 120 },
  { date: "2024-04-04", Compras: 242, Avaliacao: 260 },
  { date: "2024-04-05", Compras: 373, Avaliacao: 290 },
  { date: "2024-04-06", Compras: 301, Avaliacao: 40 },
  { date: "2024-04-07", Compras: 245, Avaliacao: 180 },
  { date: "2024-04-08", Compras: 409, Avaliacao: 50 },
  { date: "2024-06-11", Compras: 92, Avaliacao: 150 },
  { date: "2024-06-12", Compras: 492, Avaliacao: 53 },
  { date: "2024-06-13", Compras: 81, Avaliacao: 130 },
  { date: "2024-06-14", Compras: 426, Avaliacao: 80 },
  { date: "2024-06-15", Compras: 307, Avaliacao: 150 },
  { date: "2024-06-16", Compras: 371, Avaliacao: 210 },
  { date: "2024-06-17", Compras: 475, Avaliacao: 120 },
  { date: "2024-06-18", Compras: 107, Avaliacao: 170 },
  { date: "2024-06-19", Compras: 341, Avaliacao: 290 },
  { date: "2024-06-20", Compras: 408, Avaliacao: 50 },
  { date: "2024-06-21", Compras: 169, Avaliacao: 210 },
  { date: "2024-06-22", Compras: 317, Avaliacao: 270 },
  { date: "2024-06-23", Compras: 480, Avaliacao: 30 },
  { date: "2024-06-24", Compras: 132, Avaliacao: 180 },
  { date: "2024-06-25", Compras: 141, Avaliacao: 190 },
  { date: "2024-06-26", Compras: 434, Avaliacao: 380 },
  { date: "2024-06-27", Compras: 448, Avaliacao: 92 },
  { date: "2024-06-28", Compras: 149, Avaliacao: 200 },
  { date: "2024-06-29", Compras: 103, Avaliacao: 160 },
  { date: "2024-06-30", Compras: 446, Avaliacao: 100 },
];
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
  const [ultimasVendasData, setUltimasVendasData] = React.useState([]);

  const navigate = useNavigate();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Compras");
  const [mostReviewed, setMostReviewed] = React.useState<string | null>(null);
  const total = React.useMemo(
    () => ({
      Compras: chartData.reduce((acc, curr) => acc + curr.Compras, 0),
      Avaliacao: chartData.reduce((acc, curr) => acc + curr.Avaliacao, 0),
    }),
    []
  );
  const maisVendido = "Whey 300g";
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
        return null;  
      }

      const data = JSON.parse(textResponse);
      console.log(data);
      setUltimasVendasData(data);
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

      return data.name;
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const fetchMostReviewed = async () => {
      const product = await maisAvaliado();
      setMostReviewed(product);
    };

    const fetchVendas = async () => {
      await ultimasVendas();
    };
    fetchVendas();
    fetchMostReviewed();
  }, [maisAvaliado]);

  return (
    <>
      <section className="flex ">
        <Card className="h-1200px border-none mt-2 ml-2 rounded-3xl p-4 bg-black">
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-black">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle className="text-neutral-100">Vendas do mês</CardTitle>
              <CardDescription className="text-neutral-200">
                total de compras dos últimos 3 meses
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
        </Card>
        <div className="flex flex-wrap justify-center items-center gap-4 m-5 max-w-full">
          <div className="flex flex-col items-center  min-w-[320px] w-full  bg-black h-60 p-10  text-start rounded-3xl">
            <div className="w-full">
              <PiggyBank size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 text-xs">Seus ganhos foram:</p>
              <p className="font-bold mt-2 text-3xl">R$ {wallet}</p>
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

          {maisVendido && (
            <div className="flex-1 min-w-[220px]  justify-center bg-black h-60 p-10 items-center rounded-3xl">
              <ShoppingBasket size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 mt-2 text-xs">
                Produto mais vendido:
              </p>
              <p className="font-bold mt-2 text-3xl">{maisVendido}</p>
            </div>
          )}

          {mostReviewed && (
            <div className="flex-1 min-w-[220px] h-60 justify-center bg-black  p-10 items-center rounded-3xl">
              <ShoppingBasket size={35} className="text-neutral-50 " />
              <p className="text-neutral-500 mt-2 text-xs">
                Produto mais bem avaliado:
              </p>
              <p className="font-bold mt-2 text-3xl">{mostReviewed}</p>
            </div>
          )}
        </div>
      </section>

      <DataTable  data={ultimasVendasData} />

      <FooterEmpresa />
    </>
  );
}

export default Dashboard;
