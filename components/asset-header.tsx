import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssetHeaderProps {
  ticker: string
}

export function AssetHeader({ ticker }: AssetHeaderProps) {
  // Dados simplificados
  const price = "100.00"
  const change = "+2.5"
  const positive = true

  const assetName =
    {
      BTC: "Bitcoin",
      ETH: "Ethereum",
      PETR4: "Petrobras",
      VALE3: "Vale",
      ITUB4: "Itaú Unibanco",
      MGLU3: "Magazine Luiza",
    }[ticker] || ticker

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {assetName} ({ticker})
        </h1>
        <div className="flex items-center mt-1">
          <span className="text-xl font-semibold mr-2">
            {ticker.includes("BTC") || ticker.includes("ETH") ? `$${price}` : `R$ ${price}`}
          </span>
          <span className={`flex items-center text-sm ${positive ? "text-green-500" : "text-red-500"}`}>
            {positive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
            {change}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select defaultValue="1d">
          <SelectTrigger className="w-full md:w-[120px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">1 hora</SelectItem>
            <SelectItem value="4h">4 horas</SelectItem>
            <SelectItem value="1d">Diário</SelectItem>
            <SelectItem value="1w">Semanal</SelectItem>
            <SelectItem value="1m">Mensal</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Adicionar aos Favoritos</Button>
      </div>
    </div>
  )
}
