"use client"

import { useState, useEffect } from "react"
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGPTraderStore } from "@/lib/store"

export function BacktestResults() {
  // Alterado para true para exibir os resultados por padrão
  const [hasResults, setHasResults] = useState(true)
  const { backtestResults, setBacktestResults } = useGPTraderStore()

  // Dados simulados - em uma aplicação real, viriam do resultado do backtest
  const generateBacktestData = () => {
    const data = []
    let equity = 10000
    let price = 100

    for (let i = 0; i < 30; i++) {
      const change = Math.random() * 6 - 2
      price = Number((price + change).toFixed(2))

      // Simular mudanças no equity baseadas no preço
      const equityChange = Math.random() * 500 - 200
      equity = Number((equity + equityChange).toFixed(2))

      data.push({
        date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price,
        equity,
        drawdown: Number((Math.random() * -10).toFixed(2)),
      })
    }

    return data
  }

  // Usar dados do store ou gerar novos se não existirem
  const data = backtestResults?.data || generateBacktestData()

  // Estatísticas simuladas ou do store
  const stats = backtestResults?.stats || {
    totalReturn: "+24.5%",
    winRate: "70%",
    profitFactor: "2.3",
    maxDrawdown: "-12.4%",
    sharpeRatio: "1.8",
    trades: 10,
  }

  // Operações simuladas ou do store
  const trades = backtestResults?.trades || [
    { id: 1, date: "10/01/2023", type: "Compra", price: "45.320", result: "+5.2%", status: "win" },
    { id: 2, date: "15/02/2023", type: "Venda", price: "47.650", result: "+3.8%", status: "win" },
    { id: 3, date: "03/03/2023", type: "Compra", price: "46.120", result: "-2.1%", status: "loss" },
    { id: 4, date: "22/04/2023", type: "Venda", price: "48.750", result: "+4.5%", status: "win" },
    { id: 5, date: "14/05/2023", type: "Compra", price: "50.230", result: "+6.8%", status: "win" },
  ]

  // Efeito para verificar se há resultados no store
  useEffect(() => {
    if (backtestResults) {
      setHasResults(true)
    }
  }, [backtestResults])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md shadow-md p-3 text-card-foreground">
          <p className="font-medium">{payload[0]?.payload?.date || "N/A"}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index}>
              {entry.name || entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {!hasResults ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <p className="text-muted-foreground mb-2">Nenhum resultado de backtest disponível.</p>
          <p className="text-sm text-muted-foreground">
            Configure e execute um backtest para visualizar os resultados.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Retorno Total</div>
                <div className="text-lg font-bold text-green-500">{stats.totalReturn}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Taxa de Acerto</div>
                <div className="text-lg font-bold">{stats.winRate}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Fator de Lucro</div>
                <div className="text-lg font-bold">{stats.profitFactor}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Drawdown Máx.</div>
                <div className="text-lg font-bold text-red-500">{stats.maxDrawdown}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Índice Sharpe</div>
                <div className="text-lg font-bold">{stats.sharpeRatio}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground">Operações</div>
                <div className="text-lg font-bold">{stats.trades}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="equity">
            <TabsList>
              <TabsTrigger value="equity">Curva de Equity</TabsTrigger>
              <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
              <TabsTrigger value="trades">Operações</TabsTrigger>
            </TabsList>

            <TabsContent value="equity" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="equity"
                    name="Equity"
                    stroke="#8884d8"
                    fill="rgba(136, 132, 216, 0.2)"
                  />
                  <Line type="monotone" dataKey="price" name="Preço" stroke="#82ca9d" yAxisId={1} />
                </ComposedChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="drawdown" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="drawdown"
                    name="Drawdown"
                    stroke="#ef4444"
                    fill="rgba(239, 68, 68, 0.2)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="trades">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-2 p-3 border-b font-medium text-sm">
                  <div>Data</div>
                  <div>Tipo</div>
                  <div>Preço</div>
                  <div>Resultado</div>
                  <div>Status</div>
                </div>
                {trades.map((trade) => (
                  <div key={trade.id} className="grid grid-cols-5 gap-2 p-3 border-b text-sm">
                    <div>{trade.date}</div>
                    <div>{trade.type}</div>
                    <div>{trade.price}</div>
                    <div className={trade.status === "win" ? "text-green-500" : "text-red-500"}>{trade.result}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          trade.status === "win" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {trade.status === "win" ? "Ganho" : "Perda"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
