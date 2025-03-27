"use client"

import { useState } from "react"
import { CalendarIcon, Clock, X, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function FormateurDisponibilites() {
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({
    lundi: true,
    mardi: true,
    mercredi: true,
    jeudi: true,
    vendredi: true,
    samedi: false,
    dimanche: false,
  })

  const [indisponibilites, setIndisponibilites] = useState<Date[]>([])

  const handleDayChange = (day: string, checked: boolean) => {
    setSelectedDays({
      ...selectedDays,
      [day]: checked,
    })
  }

  const handleAddIndisponibilite = () => {
    if (date && !indisponibilites.some((d) => d.toDateString() === date.toDateString())) {
      setIndisponibilites([...indisponibilites, date])
      setDate(undefined)
    }
  }

  const handleRemoveIndisponibilite = (dateToRemove: Date) => {
    setIndisponibilites(indisponibilites.filter((d) => d.toDateString() !== dateToRemove.toDateString()))
  }

  const handleClearAll = () => {
    setIndisponibilites([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Disponibilités hebdomadaires</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Jours de travail habituels</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Object.entries(selectedDays).map(([day, checked]) => (
                <div key={day} className="flex items-center space-x-3">
                  <Checkbox
                    id={day}
                    checked={checked}
                    onCheckedChange={(checked) => handleDayChange(day, checked === true)}
                    className="h-5 w-5 rounded-md border-2 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label htmlFor={day} className="capitalize text-sm font-medium">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-sm font-medium mb-3">Plage horaire par défaut</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="space-y-1">
                    <Label htmlFor="heure-debut" className="text-xs">De</Label>
                    <Input 
                      id="heure-debut" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="heure-fin" className="text-xs">À</Label>
                    <Input 
                      id="heure-fin" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Périodes d'indisponibilité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={setDate} 
                    initialFocus 
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button 
              onClick={handleAddIndisponibilite} 
              disabled={!date}
              className="h-11 gap-1"
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">
                Dates sélectionnées ({indisponibilites.length})
              </h4>
              {indisponibilites.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 h-8 px-2"
                  onClick={handleClearAll}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Tout supprimer
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {indisponibilites.length > 0 ? (
                indisponibilites.map((date, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="flex items-center gap-1 py-1.5 px-3 rounded-lg"
                  >
                    <span className="text-sm">
                      {format(date, "PPP", { locale: fr })}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-red-50 hover:text-red-500"
                      onClick={() => handleRemoveIndisponibilite(date)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </Badge>
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-6 text-muted-foreground text-sm">
                  Aucune date d'indisponibilité ajoutée
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}