"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell } from "lucide-react"
import { useGPTraderStore } from "@/lib/store"

interface AlertSetupProps {
  ticker: string
}

export function AlertSetup({ ticker }: AlertSetupProps) {
  const [alertType, setAlertType] = useState("price")
  const [priceValue, setPriceValue] = useState("")
  const [indicatorType, setIndicatorType] = useState("rsi")
  const [indicatorValue, setIndicatorValue] = useState("")
  const [isEnabled, setIsEnabled] = useState(true)
  const { addAlert } = useGPTraderStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const alert = {
      id: Date.now().toString(),
      ticker,
      type: alertType,
      value: alertType === "price" ? priceValue : indicatorValue,
      indicatorType: alertType === "indicator" ? indicatorType : null,
      isEnabled,
      createdAt: new Date().toISOString(),
    }

    addAlert(alert)

    // Reset form
    setPriceValue("")
    setIndicatorValue("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Configurar Alerta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Alerta</Label>
            <Select value={alertType} onValueChange={setAlertType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de alerta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Preço</SelectItem>
                <SelectItem value="indicator">Indicador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {alertType === "price" ? (
            <div className="space-y-2">
              <Label htmlFor="price-value">Valor do Preço</Label>
              <Input
                id="price-value"
                type="number"
                step="0.01"
                placeholder="Ex: 50000"
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                required
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Indicador</Label>
                <Select value={indicatorType} onValueChange={setIndicatorType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o indicador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rsi">RSI</SelectItem>
                    <SelectItem value="macd">MACD</SelectItem>
                    <SelectItem value="sma">SMA Cruzamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="indicator-value">Valor do Indicador</Label>
                <Input
                  id="indicator-value"
                  type="number"
                  step="0.01"
                  placeholder={indicatorType === "rsi" ? "Ex: 70" : "Ex: 0"}
                  value={indicatorValue}
                  onChange={(e) => setIndicatorValue(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="alert-enabled">Ativar Alerta</Label>
            <Switch id="alert-enabled" checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>

          <Button type="submit" className="w-full">
            Salvar Alerta
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
