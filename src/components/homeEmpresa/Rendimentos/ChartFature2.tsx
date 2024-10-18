"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartMoneyProps } from "@/interface/ChartMoney";

export const description = "A stacked bar chart with a legend";



const chartConfig = {
  Ganhos: {
    label: "Ganhos",
    color: "#28a745",
  },
} satisfies ChartConfig;
const formatCurrency = (value: number | bigint) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
export function ChartFature2({data}: ChartMoneyProps) {
  return (
    <Card className="bg-primary border-none text-white shadow-none w-[500px]">
      <CardHeader>
        <CardTitle>Inicio do ano até: </CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          

          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Ganhos"
              stackId="a"
              fill="var(--color-Ganhos)"
              radius={[5, 5, 4, 4]}
            >
              <LabelList
                position="top"
                offset={12}
                className="text-white font-semibold"
                fontSize={12}
                formatter={(value: number | bigint) => formatCurrency(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <CardFooter>
        <p className="text-neutral-300 font-light text-sm">(Meramente Ilustrativo)</p>   
        </CardFooter>
      </CardContent>
    </Card>
  );
}
