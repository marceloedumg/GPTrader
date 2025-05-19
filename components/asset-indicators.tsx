"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

interface AssetIndicatorsProps {
  ticker: string
}

interface Indicator {
  name: string
  value: string
  status: "bullish" | "bearish" | "neutral"
  description: string
}

export function AssetIndicators({ ticker }: AssetIndicatorsProps) {
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndicators, setSelectedIndicators] = useState({
    sma: true,
    ema: false,
    rsi: true,
    macd: false,
    bollinger: false,
    volume: true,
  })

  useEffect(() => {
    async function fetchGPTraderRecommendations() {
      setIsLoading(true)
      try {
        // Em uma implementação real, isso seria uma chamada à API
        // Simulando uma resposta do GPTrader
        setTimeout(() => {
          const recommendedIndicators: Indicator[] = [
            {
              name: "RSI (14)",
              value: "48.32",
              status: "neutral",
              description: "Indicador de sobrecompra/sobrevenda",
            },
            {
              name: "MACD",
              value: "-0.42",
              status: "bearish",
              description: "Convergência/Divergência de Médias Móveis",
            },
            {
              name: "SMA (20)",
              value: "102.45",
              status: "bullish",
              description: "Média Móvel Simples de 20 períodos",
            },
            {
              name: "EMA (50)",
              value: "98.76",
              status: "neutral",
              description: "Média Móvel Exponencial de 50 períodos",
            },
            {
              name: "Bollinger Bands",
              value: "Neutro",
              status: "neutral",
              description: "Bandas de volatilidade",
            },
          ]

          // Atualizar os indicadores selecionados com base nas recomendações do GPTrader
          setSelectedIndicators({
            sma: true,
            ema: true,
            rsi: true,
            macd: true,
            bollinger: true,
            volume: true,
          })

          setIndicators(recommendedIndicators)
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Erro ao obter recomendações do GPTrader:", error)
        setIsLoading(false)
      }
    }

    fetchGPTraderRecommendations()
  }, [ticker])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "bullish":
        return "bg-green-500"
      case "bearish":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  const handleIndicatorChange = (indicator: string, checked: boolean) => {
    setSelectedIndicators((prev) => ({
      ...prev,
      [indicator]: checked,
    }))
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">O GPTrader está analisando os melhores indicadores para {ticker}...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-medium flex items-center justify-between">
          <span>Indicadores Recomendados pelo GPTrader</span>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Automático
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sma"
              checked={selectedIndicators.sma}
              onCheckedChange={(checked) => handleIndicatorChange("sma", checked as boolean)}
            />
            <Label htmlFor="sma">SMA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ema"
              checked={selectedIndicators.ema}
              onCheckedChange={(checked) => handleIndicatorChange("ema", checked as boolean)}
            />
            <Label htmlFor="ema">EMA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rsi"
              checked={selectedIndicators.rsi}
              onCheckedChange={(checked) => handleIndicatorChange("rsi", checked as boolean)}
            />
            <Label htmlFor="rsi">RSI</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="macd"
              checked={selectedIndicators.macd}
              onCheckedChange={(checked) => handleIndicatorChange("macd", checked as boolean)}
            />
            <Label htmlFor="macd">MACD</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bollinger"
              checked={selectedIndicators.bollinger}
              onCheckedChange={(checked) => handleIndicatorChange("bollinger", checked as boolean)}
            />
            <Label htmlFor="bollinger">Bollinger</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="volume"
              checked={selectedIndicators.volume}
              onCheckedChange={(checked) => handleIndicatorChange("volume", checked as boolean)}
            />
            <Label htmlFor="volume">Volume</Label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="font-medium">Resumo Técnico</div>
        {indicators.map((indicator) => (
          <Card key={indicator.name} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{indicator.name}</div>
                  <div className="text-sm text-muted-foreground">{indicator.description}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold">{indicator.value}</div>
                  <Badge variant="outline" className={`${getStatusColor(indicator.status)} text-white mt-1`}>
                    {indicator.status === "bullish" ? "Compra" : indicator.status === "bearish" ? "Venda" : "Neutro"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
