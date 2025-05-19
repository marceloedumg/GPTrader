import axios from "axios"

// Exemplo usando Alpha Vantage para ações e Yahoo Finance para criptomoedas
export async function fetchAssetData(ticker: string, timeframe = "daily") {
  try {
    // Determinar se é cripto ou ação
    const isCrypto = ["BTC", "ETH"].includes(ticker)

    if (isCrypto) {
      // Usar Yahoo Finance para criptomoedas
      const symbol = ticker === "BTC" ? "BTC-USD" : "ETH-USD"
      const interval = timeframe === "daily" ? "1d" : timeframe === "weekly" ? "1wk" : "1h"
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=3mo`,
      )

      // Processar dados do Yahoo Finance
      const quotes = response.data.chart.result[0]
      const timestamps = quotes.timestamp
      const ohlc = quotes.indicators.quote[0]

      return timestamps.map((time: number, i: number) => ({
        date: new Date(time * 1000).toLocaleDateString(),
        open: ohlc.open[i],
        high: ohlc.high[i],
        low: ohlc.low[i],
        close: ohlc.close[i],
        volume: ohlc.volume[i],
      }))
    } else {
      // Usar Alpha Vantage para ações brasileiras
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY
      const symbol = `${ticker}.SA` // Formato para ações brasileiras
      const function_name = timeframe === "daily" ? "TIME_SERIES_DAILY" : "TIME_SERIES_WEEKLY"

      const response = await axios.get(
        `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol}&apikey=${apiKey}`,
      )

      // Processar dados do Alpha Vantage
      const timeSeries = response.data[`Time Series (${timeframe === "daily" ? "Daily" : "Weekly"})`]

      return Object.entries(timeSeries)
        .map(([date, values]: [string, any]) => ({
          date,
          open: Number.parseFloat(values["1. open"]),
          high: Number.parseFloat(values["2. high"]),
          low: Number.parseFloat(values["3. low"]),
          close: Number.parseFloat(values["4. close"]),
          volume: Number.parseFloat(values["5. volume"]),
        }))
        .reverse()
    }
  } catch (error) {
    console.error(`Erro ao buscar dados para ${ticker}:`, error)
    throw new Error(`Falha ao obter dados para ${ticker}`)
  }
}

// Calcular indicadores técnicos
export function calculateSMA(data: any[], period: number) {
  return data.map((_, i) => {
    if (i < period - 1) return { ...data[i], sma: null }

    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0)
    return { ...data[i], sma: sum / period }
  })
}

export function calculateRSI(data: any[], period = 14) {
  // Implementação do cálculo de RSI
  const rsiData = [...data]
  const gains = []
  const losses = []

  // Calcular ganhos e perdas
  for (let i = 1; i < rsiData.length; i++) {
    const change = rsiData[i].close - rsiData[i - 1].close
    gains.push(change > 0 ? change : 0)
    losses.push(change < 0 ? Math.abs(change) : 0)
  }

  // Calcular médias iniciais
  let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period
  let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period

  // Calcular RSI para cada ponto
  rsiData[period].rsi = 100 - 100 / (1 + avgGain / (avgLoss || 0.01))

  for (let i = period + 1; i < rsiData.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i - 1]) / period
    avgLoss = (avgLoss * (period - 1) + losses[i - 1]) / period

    rsiData[i].rsi = 100 - 100 / (1 + avgGain / (avgLoss || 0.01))
  }

  return rsiData
}
