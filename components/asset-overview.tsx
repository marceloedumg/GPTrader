import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AssetOverviewProps {
  ticker: string
  name: string
}

export function AssetOverview({ ticker, name }: AssetOverviewProps) {
  // Dados simulados - em uma aplicação real, viriam de uma API
  const getRandomPrice = () => (Math.random() * 100).toFixed(2)
  const getRandomChange = () => (Math.random() * 5 - 2.5).toFixed(2)

  const price = getRandomPrice()
  const change = getRandomChange()
  const positive = Number.parseFloat(change) >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {name} ({ticker})
        </CardTitle>
        <div className={`flex items-center text-xs ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
          {change}%
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-2xl font-bold">
          {ticker.includes("BTC") || ticker.includes("ETH") ? `$${price}` : `R$ ${price}`}
        </div>

        <div className="h-10 w-full bg-muted rounded-md overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-muted to-muted-foreground/20 animate-pulse" />
        </div>

        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/ativo/${ticker}`} className="flex items-center justify-center gap-2">
            Ver detalhes
            <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
