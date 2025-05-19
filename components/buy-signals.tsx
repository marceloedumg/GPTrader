"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ExternalLink, Loader2 } from "lucide-react"

interface Asset {
  ticker: string
  name: string
  price: string
  change: string
  signal: string
  confidence: number
  indicators: string[]
}

export function BuySignals() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBuySignals() {
      setIsLoading(true)
      try {
        // Em uma implementação real, isso seria uma chamada à API
        // Simulando uma resposta do GPTrader
        setTimeout(() => {
          const buySignals: Asset[] = [
            {
              ticker: "PETR4",
              name: "Petrobras",
              price: "R$ 38.75",
              change: "+2.3%",
              signal: "Compra Forte",
              confidence: 85,
              indicators: ["RSI Sobrevendido", "Cruzamento de Médias", "Suporte Confirmado"],
            },
            {
              ticker: "VALE3",
              name: "Vale",
              price: "R$ 68.42",
              change: "+1.7%",
              signal: "Compra",
              confidence: 75,
              indicators: ["Rompimento de Resistência", "Volume Crescente"],
            },
            {
              ticker: "BTC",
              name: "Bitcoin",
              price: "$63,245.00",
              change: "+3.2%",
              signal: "Compra",
              confidence: 70,
              indicators: ["Retração de Fibonacci", "Divergência Positiva RSI"],
            },
          ]

          setAssets(buySignals)
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error("Erro ao obter sinais de compra:", error)
        setIsLoading(false)
      }
    }

    fetchBuySignals()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">O GPTrader está analisando sinais de compra...</p>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center">
        <p className="text-muted-foreground">Nenhum sinal de compra encontrado no momento.</p>
        <p className="text-sm text-muted-foreground mt-2">
          O GPTrader continuará monitorando o mercado em busca de oportunidades.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <Card key={asset.ticker} className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">
                {asset.name} ({asset.ticker})
              </CardTitle>
              <Badge className="bg-green-500">{asset.signal}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">{asset.price}</span>
              <span className="flex items-center text-green-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                {asset.change}
              </span>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Confiança do GPTrader</div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${asset.confidence}%` }}></div>
              </div>
              <div className="text-right text-xs text-muted-foreground mt-1">{asset.confidence}%</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Indicadores</div>
              <div className="flex flex-wrap gap-1">
                {asset.indicators.map((indicator, index) => (
                  <Badge key={index} variant="outline" className="bg-green-500/10 text-green-500">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="w-full mt-2">
              <Link href={`/ativo/${asset.ticker}`} className="flex items-center justify-center gap-2">
                Ver detalhes
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
