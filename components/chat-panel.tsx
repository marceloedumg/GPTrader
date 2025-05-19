"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { useGPTraderStore } from "@/lib/store"

interface ChatPanelProps {
  onClose: () => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addAnalysis } = useGPTraderStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o GPTrader, seu assistente de análise técnica. Como posso ajudar hoje? Você pode me perguntar sobre indicadores, estratégias ou solicitar análises específicas de ativos.",
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulação de resposta da API
      setTimeout(() => {
        const response = {
          role: "assistant" as const,
          content: `Análise para "${input}": Esta é uma simulação de resposta. Em uma implementação real, aqui estaria a resposta da API OpenAI com a análise técnica solicitada.`,
        }

        setMessages((prev) => [...prev, response])

        // Salvar análise no store
        addAnalysis({
          id: Date.now().toString(),
          query: input,
          result: response.content,
          timestamp: new Date().toISOString(),
        })

        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        },
      ])
      setIsLoading(false)
    }
  }

  return (
    <Card className="absolute bottom-4 left-4 right-4 h-[500px] flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium">GPTrader - Assistente IA</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
        <Input
          placeholder="Pergunte sobre indicadores ou solicite análises..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Enviar
        </Button>
      </form>
    </Card>
  )
}
