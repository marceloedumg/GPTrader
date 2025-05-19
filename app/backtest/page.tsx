import { BacktestForm } from "@/components/backtest-form"
import { BacktestResults } from "@/components/backtest-results"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"

export default function BacktestPage() {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="Backtest" description="Teste estratégias de trading em dados históricos" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Configurar Backtest</h3>
          <BacktestForm />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4">Resultados</h3>
          <BacktestResults />
        </Card>
      </div>
    </div>
  )
}
