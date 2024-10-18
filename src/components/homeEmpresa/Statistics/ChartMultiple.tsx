import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { ChartMultipleProps } from "@/interface/ChartMultiple";

export const description = "A multiple line chart";

const chartConfig = {
  Compras: {
    label: "Compras",
    color: "#8400ff",
  },
  Avaliacao: {
    label: "Avaliações",
    color: "#ffff00",
  },
} satisfies ChartConfig;
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function Chartmultiple({ data }: ChartMultipleProps) {
  return (
    <Card className="w-[440px] bg-black text-white border-white border-[0.5px]">
      <CardHeader>
        <CardTitle>Estaticas das Vendas e Avaliações</CardTitle>
        <CardDescription className="text-muted-foreground ml-2">
          {" "}
          {capitalizeFirstLetter(
            new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
              new Date()
            )
          )}{" "}
          / {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelStyle={{ fontSize: 12 }}
                  className="text-black bg-neutral-100 border-none"
                />
              }
            />
            <Line
              dataKey="Compras"
              type="monotone"
              stroke="var(--color-Compras)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Avaliacao"
              type="monotone"
              stroke="var(--color-Avaliacao)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <span className="text-neutral-500 text-wrap max-w-60 text-xs ">
              voce precisa de pelo menos 2 dias na plataforma ou mais para paracer
            </span>
            <div className="text-white flex items-center gap-2 leading-none text-muted-foreground text-wrap max-w-60">
              Mostra suas vendas e avaliações Trimestrais.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
