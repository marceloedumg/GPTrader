"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ChevronLeft, Home, LineChart, MessageSquare, Settings, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChatPanel } from "./chat-panel"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className={cn("relative h-screen border-r bg-card transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-14 items-center px-4 border-b">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-bold">GPTrader Insight</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto">
            <TrendingUp className="h-5 w-5 text-primary" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("absolute right-2 top-3", collapsed && "rotate-180")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/" ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "justify-center px-0")}
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname.includes("/ativo") ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "justify-center px-0")}
            >
              <Link href="/ativo/BTC">
                <LineChart className="mr-2 h-4 w-4" />
                {!collapsed && <span>Ativos</span>}
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/backtest" ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "justify-center px-0")}
            >
              <Link href="/backtest">
                <BarChart3 className="mr-2 h-4 w-4" />
                {!collapsed && <span>Backtest</span>}
              </Link>
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="space-y-1">
            <Button
              variant={chatOpen ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "justify-center px-0")}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {!collapsed && <span>GPTrader</span>}
            </Button>

            <Button variant="ghost" className={cn("w-full justify-start", collapsed && "justify-center px-0")}>
              <Settings className="mr-2 h-4 w-4" />
              {!collapsed && <span>Configurações</span>}
            </Button>
          </div>
        </div>
      </ScrollArea>

      {chatOpen && !collapsed && <ChatPanel onClose={() => setChatOpen(false)} />}
    </div>
  )
}
