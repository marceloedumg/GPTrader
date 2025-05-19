import { type NextRequest, NextResponse } from "next/server"
import { GPTClient } from "@/lib/gpt-client"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // Verificar se a chave de API está configurada
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key não configurada" }, { status: 500 })
    }

    // Inicializar o cliente GPT
    const gptClient = new GPTClient({ apiKey })

    // Obter a resposta
    const response = await gptClient.getCompletion(prompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Erro na rota de API:", error)
    return NextResponse.json({ error: "Falha ao processar a solicitação" }, { status: 500 })
  }
}
