"use client"
import { addDays, format, startOfMonth, startOfWeek, endOfMonth, endOfWeek, isSameMonth, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button" // Import manquant
import { Calendar } from "lucide-react" // Import manquant

interface CalendarViewProps {
  view: "month" | "week" | "day"
  currentDate: Date
}

export function CalendarView({ view, currentDate }: CalendarViewProps) {
  // Exemple de sessions de formation avec couleurs différentes
  const sessions = [
    {
      id: 1,
      title: "Introduction à React",
      date: new Date(2023, 4, 20),
      time: "09:00 - 17:00",
      location: "Salle A102",
      formateur: "Jean Dupont",
      color: "bg-blue-100 border-blue-300 text-blue-800"
    },
    {
      id: 2,
      title: "Spring Boot pour débutants",
      date: new Date(2023, 4, 25),
      time: "09:00 - 17:00",
      location: "En ligne",
      formateur: "Marie Martin",
      color: "bg-green-100 border-green-300 text-green-800"
    },
    {
      id: 3,
      title: "Angular Avancé",
      date: new Date(2023, 5, 1),
      time: "09:00 - 17:00",
      location: "Salle B201",
      formateur: "Pierre Leroy",
      color: "bg-purple-100 border-purple-300 text-purple-800"
    },
  ]

  const getSessionsForDate = (date: Date) => {
    return sessions.filter((session) => isSameDay(session.date, date))
  }

  // Vue mensuelle améliorée
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { locale: fr })
    const endDate = endOfWeek(monthEnd, { locale: fr })

    const dateFormat = "EEEEEE" // Format court pour les jours
    const days = []
    let day = startDate

    // En-tête des jours de la semaine
    const formattedDays = []
    for (let i = 0; i < 7; i++) {
      formattedDays.push(
        <div key={`header-${i}`} className="font-medium text-center py-2 text-sm text-gray-500 uppercase tracking-wider">
          {format(addDays(startDate, i), dateFormat, { locale: fr })}
        </div>,
      )
    }

    // Jours du mois
    while (day <= endDate) {
      const week = []
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const sessionsForDay = getSessionsForDate(cloneDay)

        week.push(
          <div
            key={day.toString()}
            className={cn(
              "h-32 border border-gray-200 p-1 overflow-hidden hover:bg-gray-50 transition-colors",
              !isSameMonth(day, monthStart) && "bg-gray-50 text-gray-400",
              isSameDay(day, new Date()) && "bg-blue-50 border-blue-200",
            )}
          >
            <div className={cn(
              "font-medium text-sm mb-1 w-6 h-6 flex items-center justify-center rounded-full",
              isSameDay(day, new Date()) && "bg-blue-600 text-white"
            )}>
              {format(day, "d", { locale: fr })}
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {sessionsForDay.map((session) => (
                <div
                  key={session.id}
                  className={`text-xs p-1 rounded mb-1 truncate border ${session.color}`}
                  title={`${session.title} - ${session.time} - ${session.location}`}
                >
                  <div className="font-medium truncate">{session.title}</div>
                  <div className="text-xs opacity-80 truncate">{session.time}</div>
                </div>
              ))}
            </div>
          </div>,
        )
        day = addDays(day, 1)
      }
      days.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {week}
        </div>,
      )
    }

    return (
      <div className="space-y-1">
        <div className="grid grid-cols-7 bg-gray-50 rounded-t-lg">{formattedDays}</div>
        {days}
      </div>
    )
  }

  // Vue hebdomadaire améliorée
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { locale: fr })
    const days = []

    // Jours de la semaine
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i)
      const sessionsForDay = getSessionsForDate(day)

      days.push(
        <div key={`day-${i}`} className="flex flex-col">
          <div className={cn(
            "font-medium text-center py-2 border-b",
            isSameDay(day, new Date()) ? "bg-blue-50 text-blue-600" : "bg-gray-50"
          )}>
            <div className="text-sm">{format(day, "EEEEEE", { locale: fr })}</div>
            <div className={cn(
              "mx-auto w-8 h-8 flex items-center justify-center rounded-full",
              isSameDay(day, new Date()) && "bg-blue-600 text-white"
            )}>
              {format(day, "d", { locale: fr })}
            </div>
          </div>
          <div className="flex-1 border-r min-h-24 p-1 space-y-1">
            {sessionsForDay.map((session) => (
              <div 
                key={session.id} 
                className={`p-2 rounded-md text-sm border ${session.color} hover:shadow-md transition-shadow`}
              >
                <div className="font-medium">{session.title}</div>
                <div className="text-xs opacity-80">{session.time}</div>
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 border rounded-lg overflow-hidden">
        {days}
      </div>
    )
  }

  // Vue journalière améliorée
  const renderDayView = () => {
    const sessionsForDay = getSessionsForDate(currentDate)

    return (
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold">
            {format(currentDate, "EEEE d MMMM yyyy", { locale: fr })}
          </h3>
          <p className="text-gray-500">
            {sessionsForDay.length} session{sessionsForDay.length !== 1 ? 's' : ''} programmée{sessionsForDay.length !== 1 ? 's' : ''}
          </p>
        </div>

        {sessionsForDay.length > 0 ? (
          <div className="space-y-4">
            {sessionsForDay.map((session) => (
              <div 
                key={session.id} 
                className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${session.color}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{session.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <span>{session.time}</span>
                      <span>•</span>
                      <span>{session.location}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-white rounded-md text-xs font-medium shadow-sm">
                    {session.formateur}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">Détails</Button>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-500">Aucune session programmée</h4>
            <p className="text-gray-400 mt-1">Cette journée ne contient aucune session de formation</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6">
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
    </div>
  )
}