export class GPTClient {
  private apiKey: string

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey
  }

  async getCompletion(prompt: string): Promise<string> {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error: any) {
      console.error("Erro ao obter completion:", error)
      throw new Error(`Falha ao obter completion: ${error.message}`)
    }
  }
}
