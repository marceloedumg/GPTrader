"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useGPTraderStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { DatePicker } from "@/components/date-picker"
import { format } from "date-fns"

export function BacktestForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { addAnalysis, setBacktestResults } = useGPTraderStore()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    asset: "BTC",
    timeframe: "1d",
    initialCapital: "10000",
    strategy:
      "Cruzamento de médias móveis simples (SMA) de 20 e 50 períodos. Comprar quando SMA 20 cruzar para cima da SMA 50, vender quando cruzar para baixo.",
  })

  const [startDate, setStartDate] = useState(new Date(2023, 0, 1)) // 2023-01-01
  const [endDate, setEndDate] = useState(new Date(2023, 11, 31)) // 2023-12-31

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de processamento
    setTimeout(() => {
      // Gerar dados de backtest
      const backtestData = generateBacktestData({
        ...formData,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })

      // Atualizar o store com os resultados
      setBacktestResults(backtestData)

      // Adicionar análise ao histórico
      addAnalysis({
        id: Date.now().toString(),
        query: `Backtest de ${formData.strategy} em ${formData.asset}/${formData.timeframe}`,
        result: `Backtest concluído. A estratégia gerou um retorno de ${backtestData.stats.totalReturn} no período analisado, com ${backtestData.stats.trades} operações.`,
        timestamp: new Date().toISOString(),
      })

      // Mostrar toast de sucesso
      toast({
        title: "Backtest concluído",
        description: `Backtest de ${formData.asset} executado com sucesso.`,
      })

      setIsLoading(false)
    }, 2000)
  }

  // Função para gerar dados de backtest simulados
  const generateBacktestData = (formData: any) => {
    // Gerar dados de equity e preço
    const data = []
    let equity = Number(formData.initialCapital)
    let price = formData.asset === "BTC" ? 16000 : 100

    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const numPoints = Math.min(daysDiff, 100) // Limitar a 100 pontos para performance

    for (let i = 0; i < numPoints; i++) {
      const change = Math.random() * 6 - 2
      price = Number((price + change).toFixed(2))

      // Simular mudanças no equity baseadas no preço e estratégia
      const equityChange = Math.random() * 500 - 200
      equity = Number((equity + equityChange).toFixed(2))

      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + Math.floor(i * (daysDiff / numPoints)))

      data.push({
        date: currentDate.toLocaleDateString(),
        price,
        equity,
        drawdown: Number((Math.random() * -10).toFixed(2)),
      })
    }

    // Gerar estatísticas
    const initialEquity = Number(formData.initialCapital)
    const finalEquity = equity
    const totalReturn = `+${(((finalEquity - initialEquity) / initialEquity) * 100).toFixed(1)}%`
    const numTrades = Math.floor(Math.random() * 20) + 5
    const winTrades = Math.floor(numTrades * (Math.random() * 0.3 + 0.5)) // 50-80% win rate
    const winRate = `${Math.floor((winTrades / numTrades) * 100)}%`

    // Gerar trades
    const trades = []
    const currentDate = new Date(formData.startDate)

    for (let i = 1; i <= numTrades; i++) {
      currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 15) + 1)
      if (currentDate > endDate) break

      const isWin = i <= winTrades
      const result = isWin ? `+${(Math.random() * 8 + 2).toFixed(1)}%` : `-${(Math.random() * 4 + 1).toFixed(1)}%`
      const tradePrice = (price * (1 - Math.random() * 0.2)).toFixed(3)

      trades.push({
        id: i,
        date: currentDate.toLocaleDateString(),
        type: Math.random() > 0.5 ? "Compra" : "Venda",
        price: formData.asset === "BTC" ? `$${tradePrice}` : `R$ ${tradePrice}`,
        result,
        status: isWin ? "win" : "loss",
      })
    }

    return {
      data,
      stats: {
        totalReturn,
        winRate,
        profitFactor: (Math.random() * 2 + 1).toFixed(1),
        maxDrawdown: `-${(Math.random() * 15 + 5).toFixed(1)}%`,
        sharpeRatio: (Math.random() * 2 + 0.5).toFixed(1),
        trades: numTrades,
      },
      trades,
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="asset">Ativo</Label>
          <Select value={formData.asset} onValueChange={(value) => handleSelectChange("asset", value)}>
            <SelectTrigger id="asset">
              <SelectValue placeholder="Selecione um ativo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="PETR4">Petrobras (PETR4)</SelectItem>
              <SelectItem value="VALE3">Vale (VALE3)</SelectItem>
              <SelectItem value="ITUB4">Itaú (ITUB4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe">Período</Label>
          <Select value={formData.timeframe} onValueChange={(value) => handleSelectChange("timeframe", value)}>
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Selecione um período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 hora</SelectItem>
              <SelectItem value="4h">4 horas</SelectItem>
              <SelectItem value="1d">Diário</SelectItem>
              <SelectItem value="1w">Semanal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Data Inicial</Label>
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>

        <div className="space-y-2">
          <Label>Data Final</Label>
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="strategy">Estratégia</Label>
        <Textarea
          id="strategy"
          placeholder="Descreva sua estratégia ou solicite ao GPTrader para criar uma..."
          rows={4}
          value={formData.strategy}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="initialCapital">Capital Inicial</Label>
        <Input id="initialCapital" type="number" value={formData.initialCapital} onChange={handleChange} />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processando..." : "Executar Backtest"}
      </Button>
    </form>
  )
}
