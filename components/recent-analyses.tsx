"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGPTraderStore } from "@/lib/store"

export function RecentAnalyses() {
  const { analyses, loadAnalyses } = useGPTraderStore()

  useEffect(() => {
    loadAnalyses()
  }, [loadAnalyses])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análises Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {analyses.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Nenhuma análise recente. Use o GPTrader para analisar ativos.
          </p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card key={analysis.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{analysis.query}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(analysis.timestamp)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{analysis.result}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
