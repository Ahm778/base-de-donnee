"use client"

import { useState } from "react"
import { CalendarIcon, Download, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, subMonths } from "date-fns"
import { fr } from "date-fns/locale"

export function RapportFilters() {
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()
  const [categorieFilter, setCategorieFilter] = useState("all")
  const [formateurFilter, setFormateurFilter] = useState("all")

  const handleResetFilters = () => {
    setDateDebut(undefined)
    setDateFin(undefined)
    setCategorieFilter("all")
    setFormateurFilter("all")
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Filtres de rapport</h3>
        <Button 
          variant="ghost" 
          onClick={handleResetFilters}
          className="text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Section Période */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-700 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            Période
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Date de début</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal hover:bg-white",
                      !dateDebut && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                    {dateDebut ? (
                      <span className="text-gray-800">{format(dateDebut, "PPP", { locale: fr })}</span>
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-lg rounded-lg overflow-hidden">
                  <Calendar 
                    mode="single" 
                    selected={dateDebut} 
                    onSelect={setDateDebut} 
                    initialFocus
                    className="border-0"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Date de fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal hover:bg-white",
                      !dateFin && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                    {dateFin ? (
                      <span className="text-gray-800">{format(dateFin, "PPP", { locale: fr })}</span>
                    ) : (
                      <span>Sélectionner une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-lg rounded-lg overflow-hidden">
                  <Calendar 
                    mode="single" 
                    selected={dateFin} 
                    onSelect={setDateFin} 
                    initialFocus
                    className="border-0"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const today = new Date()
                  setDateDebut(subMonths(today, 1))
                  setDateFin(today)
                }}
              >
                30 derniers jours
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-white hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const today = new Date()
                  setDateDebut(subMonths(today, 3))
                  setDateFin(today)
                }}
              >
                90 derniers jours
              </Button>
            </div>
          </div>
        </div>

        {/* Section Filtres */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-700">Filtres avancés</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Catégorie de formation</label>
              <Select value={categorieFilter} onValueChange={setCategorieFilter}>
                <SelectTrigger className="hover:bg-white">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent className="shadow-lg rounded-lg">
                  <SelectItem value="all" className="hover:bg-gray-50">Toutes les catégories</SelectItem>
                  <SelectItem value="dev" className="hover:bg-gray-50">Développement</SelectItem>
                  <SelectItem value="design" className="hover:bg-gray-50">Design</SelectItem>
                  <SelectItem value="management" className="hover:bg-gray-50">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Formateur</label>
              <Select value={formateurFilter} onValueChange={setFormateurFilter}>
                <SelectTrigger className="hover:bg-white">
                  <SelectValue placeholder="Sélectionner un formateur" />
                </SelectTrigger>
                <SelectContent className="shadow-lg rounded-lg">
                  <SelectItem value="all" className="hover:bg-gray-50">Tous les formateurs</SelectItem>
                  <SelectItem value="jean-dupont" className="hover:bg-gray-50">Jean Dupont</SelectItem>
                  <SelectItem value="marie-martin" className="hover:bg-gray-50">Marie Martin</SelectItem>
                  <SelectItem value="pierre-leroy" className="hover:bg-gray-50">Pierre Leroy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Section Export */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Download className="h-5 w-5 text-blue-500" />
          Options d'export
        </h4>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel
          </Button>
          <Button variant="outline" className="bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            PDF
          </Button>
          <Button variant="outline" className="bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            CSV
          </Button>
        </div>
      </div>
    </div>
  )
}