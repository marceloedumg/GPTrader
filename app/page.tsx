import { AssetOverview } from "@/components/asset-overview"
import { BuySignals } from "@/components/buy-signals"
import { MarketSummary } from "@/components/market-summary"
import { PageHeader } from "@/components/page-header"
import { RecentAnalyses } from "@/components/recent-analyses"
import { SellSignals } from "@/components/sell-signals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="Dashboard" description="Visão geral dos ativos monitorados e análises recentes" />

      <MarketSummary />

      <Card>
        <CardHeader>
          <CardTitle>Sinais do GPTrader</CardTitle>
          <CardDescription>
            Recomendações automáticas de compra e venda baseadas em análise técnica avançada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy">
            <TabsList className="mb-4">
              <TabsTrigger value="buy">Sinais de Compra</TabsTrigger>
              <TabsTrigger value="sell">Sinais de Venda</TabsTrigger>
            </TabsList>
            <TabsContent value="buy">
              <BuySignals />
            </TabsContent>
            <TabsContent value="sell">
              <SellSignals />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AssetOverview ticker="BTC" name="Bitcoin" />
        <AssetOverview ticker="ETH" name="Ethereum" />
        <AssetOverview ticker="PETR4" name="Petrobras" />
        <AssetOverview ticker="VALE3" name="Vale" />
        <AssetOverview ticker="ITUB4" name="Itaú Unibanco" />
        <AssetOverview ticker="MGLU3" name="Magazine Luiza" />
      </div>

      <RecentAnalyses />
    </div>
  )
}
