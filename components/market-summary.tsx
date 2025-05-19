import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export function MarketSummary() {
  const markets = [
    {
      name: "Índice Bovespa",
      value: "118.432",
      change: "+0.87%",
      positive: true,
    },
    {
      name: "S&P 500",
      value: "5.021",
      change: "+0.32%",
      positive: true,
    },
    {
      name: "Bitcoin",
      value: "$62.145",
      change: "-1.24%",
      positive: false,
    },
    {
      name: "Dólar",
      value: "R$ 5,12",
      change: "-0.45%",
      positive: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {markets.map((market) => (
        <Card key={market.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{market.name}</CardTitle>
            <div className={`flex items-center text-xs ${market.positive ? "text-green-500" : "text-red-500"}`}>
              {market.positive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              {market.change}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{market.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
