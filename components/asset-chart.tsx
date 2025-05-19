"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface AssetChartProps {
  ticker: string
}

export function AssetChart({ ticker }: AssetChartProps) {
  const [activeTab, setActiveTab] = useState("line")

  // Dados simplificados para evitar problemas
  const data = [
    { name: "Jan", price: 100, sma: 95, ema: 98 },
    { name: "Fev", price: 120, sma: 105, ema: 110 },
    { name: "Mar", price: 110, sma: 110, ema: 112 },
    { name: "Abr", price: 140, sma: 120, ema: 125 },
    { name: "Mai", price: 130, sma: 125, ema: 128 },
    { name: "Jun", price: 150, sma: 130, ema: 135 },
    { name: "Jul", price: 145, sma: 135, ema: 138 },
    { name: "Ago", price: 160, sma: 140, ema: 145 },
    { name: "Set", price: 170, sma: 150, ema: 155 },
    { name: "Out", price: 180, sma: 160, ema: 165 },
    { name: "Nov", price: 190, sma: 170, ema: 175 },
    { name: "Dez", price: 200, sma: 180, ema: 185 },
  ]

  // Tooltip simplificado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-md shadow-md p-3 text-card-foreground">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="line" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-2">
            <TabsList>
              <TabsTrigger value="line">Linha</TabsTrigger>
              <TabsTrigger value="indicators">Indicadores</TabsTrigger>
            </TabsList>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Indicadores por GPTrader
            </Badge>
          </div>

          <TabsContent value="line" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" name="Preço" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="indicators" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="price" name="Preço" stroke="#8884d8" />
                <Line type="monotone" dataKey="sma" name="SMA (20)" stroke="#82ca9d" />
                <Line type="monotone" dataKey="ema" name="EMA (50)" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
