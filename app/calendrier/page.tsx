"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { addMonths, subMonths, format, startOfWeek, endOfWeek } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarView } from "@/components/calendar-view"
import { CalendarFilters } from "@/components/calendar-filters"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CalendrierPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))
    }
  }

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))
    } else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))
    }
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getWeekRange = () => {
    const start = startOfWeek(currentDate, { locale: fr })
    const end = endOfWeek(currentDate, { locale: fr })
    return `${format(start, "d MMM", { locale: fr })} - ${format(end, "d MMM yyyy", { locale: fr })}`
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Calendrier
          </h1>
          <p className="text-muted-foreground">Consultez et gérez les sessions de formation</p>
        </div>
        <Button className="group transition-all duration-200 hover:shadow-md">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>Ajouter une session</span>
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevious}
                className="hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleToday}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Aujourd'hui
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <h2 className="text-xl font-semibold ml-2">
                {view === "month" && format(currentDate, "MMMM yyyy", { locale: fr })}
                {view === "week" && `Semaine du ${getWeekRange()}`}
                {view === "day" && format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
              </h2>
            </div>

            <Tabs 
              value={view} 
              onValueChange={(value) => setView(value as "month" | "week" | "day")}
              className="w-[250px]"
            >
              <TabsList className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger 
                  value="month" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                >
                  Mois
                </TabsTrigger>
                <TabsTrigger 
                  value="week"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                >
                  Semaine
                </TabsTrigger>
                <TabsTrigger 
                  value="day"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                >
                  Jour
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CalendarFilters />
          
          <div className="mt-6 rounded-lg border">
            <CalendarView view={view} currentDate={currentDate} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}