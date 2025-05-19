"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, ExternalLink, Loader2 } from "lucide-react"

interface Asset {
  ticker: string
  name: string
  price: string
  change: string
  signal: string
  confidence: number
  indicators: string[]
}

export function SellSignals() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSellSignals() {
      setIsLoading(true)
      try {
        // Em uma implementação real, isso seria uma chamada à API
        // Simulando uma resposta do GPTrader
        setTimeout(() => {
          const sellSignals: Asset[] = [
            {
              ticker: "MGLU3",
              name: "Magazine Luiza",
              price: "R$ 8.45",
              change: "-3.2%",
              signal: "Venda Forte",
              confidence: 90,
              indicators: ["RSI Sobrecomprado", "Topo Duplo", "Resistência Confirmada"],
            },
            {
              ticker: "ITUB4",
              name: "Itaú Unibanco",
              price: "R$ 32.18",
              change: "-1.5%",
              signal: "Venda",
              confidence: 65,
              indicators: ["Cruzamento de Médias Negativo", "Volume Decrescente"],
            },
            {
              ticker: "ETH",
              name: "Ethereum",
              price: "$3,245.00",
              change: "-2.8%",
              signal: "Venda",
              confidence: 70,
              indicators: ["Divergência Negativa MACD", "Rompimento de Suporte"],
            },
          ]

          setAssets(sellSignals)
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error("Erro ao obter sinais de venda:", error)
        setIsLoading(false)
      }
    }

    fetchSellSignals()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">O GPTrader está analisando sinais de venda...</p>
      </div>
    )
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center">
        <p className="text-muted-foreground">Nenhum sinal de venda encontrado no momento.</p>
        <p className="text-sm text-muted-foreground mt-2">
          O GPTrader continuará monitorando o mercado em busca de alertas.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <Card key={asset.ticker} className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-medium">
                {asset.name} ({asset.ticker})
              </CardTitle>
              <Badge className="bg-red-500">{asset.signal}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">{asset.price}</span>
              <span className="flex items-center text-red-500">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                {asset.change}
              </span>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Confiança do GPTrader</div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${asset.confidence}%` }}></div>
              </div>
              <div className="text-right text-xs text-muted-foreground mt-1">{asset.confidence}%</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Indicadores</div>
              <div className="flex flex-wrap gap-1">
                {asset.indicators.map((indicator, index) => (
                  <Badge key={index} variant="outline" className="bg-red-500/10 text-red-500">
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
