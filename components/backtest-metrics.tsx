"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface BacktestMetricsProps {
  results: any // Tipo a ser definido com base nos dados reais
}

export function BacktestMetrics({ results }: BacktestMetricsProps) {
  // Dados simulados para demonstração
  const equityData = [
    { date: "Jan", equity: 10000, benchmark: 10000 },
    { date: "Fev", equity: 10500, benchmark: 10200 },
    { date: "Mar", equity: 11200, benchmark: 10100 },
    { date: "Abr", equity: 10800, benchmark: 10300 },
    { date: "Mai", equity: 11500, benchmark: 10500 },
    { date: "Jun", equity: 12200, benchmark: 10700 },
    { date: "Jul", equity: 12800, benchmark: 10900 },
    { date: "Ago", equity: 12400, benchmark: 11100 },
    { date: "Set", equity: 13100, benchmark: 11300 },
    { date: "Out", equity: 13800, benchmark: 11500 },
    { date: "Nov", equity: 14200, benchmark: 11700 },
    { date: "Dez", equity: 14800, benchmark: 11900 },
  ]

  const monthlyReturns = [
    { month: "Jan", return: 5 },
    { month: "Fev", return: 7 },
    { month: "Mar", return: -3.5 },
    { month: "Abr", return: 6.5 },
    { month: "Mai", return: 6 },
    { month: "Jun", return: 5 },
    { month: "Jul", return: -3 },
    { month: "Ago", return: 5.5 },
    { month: "Set", return: 5.5 },
    { month: "Out", return: 3 },
    { month: "Nov", return: 4 },
    { month: "Dez", return: 4.5 },
  ]

  const metrics = {
    totalReturn: "48.0%",
    annualReturn: "22.5%",
    volatility: "15.2%",
    sharpeRatio: "1.48",
    sortinoRatio: "2.12",
    maxDrawdown: "-8.3%",
    winRate: "68%",
    profitFactor: "2.8",
    expectancy: "1.35%",
    trades: 25,
    avgTradeLength: "12.4 dias",
    bestTrade: "+12.3%",
    worstTrade: "-5.2%",
  }

  // Tooltip personalizado para evitar problemas de CSS
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md shadow-md p-3 text-card-foreground">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Retorno Total</div>
            <div className="text-lg font-bold text-green-500">{metrics.totalReturn}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Retorno Anual</div>
            <div className="text-lg font-bold text-green-500">{metrics.annualReturn}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Volatilidade</div>
            <div className="text-lg font-bold">{metrics.volatility}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground">Drawdown Máx.</div>
            <div className="text-lg font-bold text-red-500">{metrics.maxDrawdown}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equity">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="equity">Curva de Equity</TabsTrigger>
          <TabsTrigger value="returns">Retornos Mensais</TabsTrigger>
          <TabsTrigger value="metrics">Métricas Avançadas</TabsTrigger>
        </TabsList>

        <TabsContent value="equity" className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={equityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="equity" name="Equity" stroke="#8884d8" fill="rgba(136, 132, 216, 0.2)" />
              <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke="#82ca9d" strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="returns" className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyReturns} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="return"
                name="Retorno %"
                fill={(entry) => (entry.return >= 0 ? "#22c55e" : "#ef4444")}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
            <div>
              <div className="text-sm font-medium">Índice Sharpe</div>
              <div className="text-lg">{metrics.sharpeRatio}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Índice Sortino</div>
              <div className="text-lg">{metrics.sortinoRatio}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Taxa de Acerto</div>
              <div className="text-lg">{metrics.winRate}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Fator de Lucro</div>
              <div className="text-lg">{metrics.profitFactor}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Expectativa</div>
              <div className="text-lg">{metrics.expectancy}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Operações</div>
              <div className="text-lg">{metrics.trades}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Duração Média</div>
              <div className="text-lg">{metrics.avgTradeLength}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Melhor Trade</div>
              <div className="text-lg text-green-500">{metrics.bestTrade}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Pior Trade</div>
              <div className="text-lg text-red-500">{metrics.worstTrade}</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
