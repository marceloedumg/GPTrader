import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Analysis {
  id: string
  query: string
  result: string
  timestamp: string
}

interface Alert {
  id: string
  ticker: string
  type: "price" | "indicator"
  value: string
  indicatorType: string | null
  isEnabled: boolean
  createdAt: string
}

interface BacktestResults {
  data: any[]
  stats: {
    totalReturn: string
    winRate: string
    profitFactor: string
    maxDrawdown: string
    sharpeRatio: string
    trades: number
  }
  trades: {
    id: number
    date: string
    type: string
    price: string
    result: string
    status: string
  }[]
}

interface GPTraderState {
  analyses: Analysis[]
  alerts: Alert[]
  backtestResults: BacktestResults | null
  addAnalysis: (analysis: Analysis) => void
  loadAnalyses: () => void
  addAlert: (alert: Alert) => void
  removeAlert: (id: string) => void
  toggleAlert: (id: string) => void
  setBacktestResults: (results: BacktestResults) => void
}

export const useGPTraderStore = create<GPTraderState>()(
  persist(
    (set, get) => ({
      analyses: [],
      alerts: [],
      backtestResults: null,

      addAnalysis: (analysis) => {
        set((state) => {
          const newAnalyses = [analysis, ...state.analyses]
          if (newAnalyses.length > 10) {
            newAnalyses.pop()
          }
          return { analyses: newAnalyses }
        })
      },

      loadAnalyses: () => {
        // Esta função é principalmente para compatibilidade com SSR
      },

      addAlert: (alert) => {
        set((state) => ({
          alerts: [...state.alerts, alert],
        }))
      },

      removeAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        }))
      },

      toggleAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((alert) => (alert.id === id ? { ...alert, isEnabled: !alert.isEnabled } : alert)),
        }))
      },

      setBacktestResults: (results) => {
        set({ backtestResults: results })
      },
    }),
    {
      name: "gptrader-storage",
    },
  ),
)
