import { AssetChart } from "@/components/asset-chart"
import { AssetHeader } from "@/components/asset-header"
import { AssetIndicators } from "@/components/asset-indicators"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

interface AssetPageProps {
  params: {
    ticker: string
  }
}

export default function AssetPage({ params }: AssetPageProps) {
  const { ticker } = params

  return (
    <div className="container py-6 space-y-6">
      <AssetHeader ticker={ticker} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Gráfico de Preços</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Analisar com GPTrader
            </Button>
          </div>
          <AssetChart ticker={ticker} />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Indicadores Técnicos</h3>
          <AssetIndicators ticker={ticker} />
        </Card>
      </div>
    </div>
  )
}
