"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", Compras: 222, Avaliacao: 150 },
  { date: "2024-04-02", Compras: 97, Avaliacao: 180 },
  { date: "2024-04-03", Compras: 167, Avaliacao: 120 },
  { date: "2024-04-04", Compras: 242, Avaliacao: 260 },
  { date: "2024-04-05", Compras: 373, Avaliacao: 290 },
  { date: "2024-04-06", Compras: 301, Avaliacao: 340 },
  { date: "2024-04-07", Compras: 245, Avaliacao: 180 },
  { date: "2024-04-08", Compras: 409, Avaliacao: 320 },
  { date: "2024-04-09", Compras: 59, Avaliacao: 110 },
  { date: "2024-04-10", Compras: 261, Avaliacao: 190 },
  { date: "2024-04-11", Compras: 327, Avaliacao: 350 },
  { date: "2024-04-12", Compras: 292, Avaliacao: 210 },
  { date: "2024-04-13", Compras: 342, Avaliacao: 380 },
  { date: "2024-04-14", Compras: 137, Avaliacao: 220 },
  { date: "2024-04-15", Compras: 120, Avaliacao: 170 },
  { date: "2024-04-16", Compras: 138, Avaliacao: 190 },
  { date: "2024-04-17", Compras: 446, Avaliacao: 360 },
  { date: "2024-04-18", Compras: 364, Avaliacao: 410 },
  { date: "2024-04-19", Compras: 243, Avaliacao: 180 },
  { date: "2024-04-20", Compras: 89, Avaliacao: 150 },
  { date: "2024-04-21", Compras: 137, Avaliacao: 200 },
  { date: "2024-04-22", Compras: 224, Avaliacao: 170 },
  { date: "2024-04-23", Compras: 138, Avaliacao: 230 },
  { date: "2024-04-24", Compras: 387, Avaliacao: 290 },
  { date: "2024-04-25", Compras: 215, Avaliacao: 250 },
  { date: "2024-04-26", Compras: 75, Avaliacao: 130 },
  { date: "2024-04-27", Compras: 383, Avaliacao: 420 },
  { date: "2024-04-28", Compras: 122, Avaliacao: 180 },
  { date: "2024-04-29", Compras: 315, Avaliacao: 240 },
  { date: "2024-04-30", Compras: 454, Avaliacao: 380 },
  { date: "2024-05-01", Compras: 165, Avaliacao: 220 },
  { date: "2024-05-02", Compras: 293, Avaliacao: 310 },
  { date: "2024-05-03", Compras: 247, Avaliacao: 190 },
  { date: "2024-05-04", Compras: 385, Avaliacao: 420 },
  { date: "2024-05-05", Compras: 481, Avaliacao: 390 },
  { date: "2024-05-06", Compras: 498, Avaliacao: 520 },
  { date: "2024-05-07", Compras: 388, Avaliacao: 300 },
  { date: "2024-05-08", Compras: 149, Avaliacao: 210 },
  { date: "2024-05-09", Compras: 227, Avaliacao: 180 },
  { date: "2024-05-10", Compras: 293, Avaliacao: 330 },
  { date: "2024-05-11", Compras: 335, Avaliacao: 270 },
  { date: "2024-05-12", Compras: 197, Avaliacao: 240 },
  { date: "2024-05-13", Compras: 197, Avaliacao: 160 },
  { date: "2024-05-14", Compras: 448, Avaliacao: 490 },
  { date: "2024-05-15", Compras: 473, Avaliacao: 380 },
  { date: "2024-05-16", Compras: 338, Avaliacao: 400 },
  { date: "2024-05-17", Compras: 499, Avaliacao: 420 },
  { date: "2024-05-18", Compras: 315, Avaliacao: 350 },
  { date: "2024-05-19", Compras: 235, Avaliacao: 180 },
  { date: "2024-05-20", Compras: 177, Avaliacao: 230 },
  { date: "2024-05-21", Compras: 82, Avaliacao: 140 },
  { date: "2024-05-22", Compras: 81, Avaliacao: 120 },
  { date: "2024-05-23", Compras: 252, Avaliacao: 290 },
  { date: "2024-05-24", Compras: 294, Avaliacao: 220 },
  { date: "2024-05-25", Compras: 201, Avaliacao: 250 },
  { date: "2024-05-26", Compras: 213, Avaliacao: 170 },
  { date: "2024-05-27", Compras: 420, Avaliacao: 460 },
  { date: "2024-05-28", Compras: 233, Avaliacao: 190 },
  { date: "2024-05-29", Compras: 78, Avaliacao: 130 },
  { date: "2024-05-30", Compras: 340, Avaliacao: 280 },
  { date: "2024-05-31", Compras: 178, Avaliacao: 230 },
  { date: "2024-06-01", Compras: 178, Avaliacao: 200 },
  { date: "2024-06-02", Compras: 470, Avaliacao: 410 },
  { date: "2024-06-03", Compras: 103, Avaliacao: 160 },
  { date: "2024-06-04", Compras: 439, Avaliacao: 380 },
  { date: "2024-06-05", Compras: 88, Avaliacao: 140 },
  { date: "2024-06-06", Compras: 294, Avaliacao: 250 },
  { date: "2024-06-07", Compras: 323, Avaliacao: 370 },
  { date: "2024-06-08", Compras: 385, Avaliacao: 320 },
  { date: "2024-06-09", Compras: 438, Avaliacao: 180 },
  { date: "2024-06-10", Compras: 155, Avaliacao: 200 },
  { date: "2024-06-11", Compras: 92, Avaliacao: 150 },
  { date: "2024-06-12", Compras: 492, Avaliacao: 420 },
  { date: "2024-06-13", Compras: 81, Avaliacao: 130 },
  { date: "2024-06-14", Compras: 426, Avaliacao: 380 },
  { date: "2024-06-15", Compras: 307, Avaliacao: 350 },
  { date: "2024-06-16", Compras: 371, Avaliacao: 210 },
  { date: "2024-06-17", Compras: 475, Avaliacao: 120 },
  { date: "2024-06-18", Compras: 107, Avaliacao: 170 },
  { date: "2024-06-19", Compras: 341, Avaliacao: 290 },
  { date: "2024-06-20", Compras: 408, Avaliacao: 450 },
  { date: "2024-06-21", Compras: 169, Avaliacao: 210 },
  { date: "2024-06-22", Compras: 317, Avaliacao: 270 },
  { date: "2024-06-23", Compras: 480, Avaliacao: 530 },
  { date: "2024-06-24", Compras: 132, Avaliacao: 180 },
  { date: "2024-06-25", Compras: 141, Avaliacao: 190 },
  { date: "2024-06-26", Compras: 434, Avaliacao: 380 },
  { date: "2024-06-27", Compras: 448, Avaliacao: 490 },
  { date: "2024-06-28", Compras: 149, Avaliacao: 200 },
  { date: "2024-06-29", Compras: 103, Avaliacao: 160 },
  { date: "2024-06-30", Compras: 446, Avaliacao: 400 },
]

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
} satisfies ChartConfig

 function Dashboard() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Compras")

  const total = React.useMemo(
    () => ({
      Compras: chartData.reduce((acc, curr) => acc + curr.Compras, 0),
      Avaliacao: chartData.reduce((acc, curr) => acc + curr.Avaliacao, 0),
    }),
    []
  )

  return (
    <Card className="h-full bg-black p-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row bg-black">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-neutral-100">Vendas do mês</CardTitle>
          <CardDescription className="text-neutral-200">
             total de compras dos últimos 3 meses
          </CardDescription>
        </div>
        <div className="flex">
          {["Compras", "Avaliacao"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className=" text-neutral-200 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground text-neutral-200">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid  vertical={false} />
            <XAxis
            
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-br", {
                  month: "short",
                  day: "numeric",
                })
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
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart}  fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default Dashboard;