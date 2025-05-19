"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [inputValue, setInputValue] = useState(format(date, "yyyy-MM-dd"))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      setDate(newDate)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Selecione uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Data</label>
              <Input type="date" value={inputValue} onChange={handleInputChange} className="w-full" />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const today = new Date()
                  setDate(today)
                  setInputValue(format(today, "yyyy-MM-dd"))
                }}
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const yesterday = new Date()
                  yesterday.setDate(yesterday.getDate() - 1)
                  setDate(yesterday)
                  setInputValue(format(yesterday, "yyyy-MM-dd"))
                }}
              >
                Ontem
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
