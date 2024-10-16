import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
import { ChartMoneyProps } from "@/interface/ChartMoney";

export const description = "A line chart with dots";

const chartConfig = {
  Ganhos: {
    label: "Ganhos",
    color: "#28a745",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatCurrency = (value: number | bigint) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};



export function ChartFature({ data }: ChartMoneyProps) {
  return (
    <div className="flex justify-center items-center m-10 ">
      <Card className="w-1/2 bg-black text-white border-white border-[0.5px]">
        <CardHeader>
          <CardTitle>Ganhos por mês</CardTitle>
          <CardDescription>
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
                top: 30,
                left: 1,
                right: 1,
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
                    indicator="dashed"
                    labelStyle={{ fontSize: 12 }}
                    className="text-black bg-neutral-100 border-none"
                  />
                }
              />
              <Line
                dataKey="Ganhos"
                type="natural"
                stroke="var(--color-Ganhos)"
                strokeWidth={2}
                dot={{
                  fill: "#28a745",
                }}
                activeDot={{    
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-white text-white"
                  fontSize={12}
                  formatter={formatCurrency}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Mostra total de ganhos anualmente
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
