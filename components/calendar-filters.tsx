"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function CalendarFilters() {
  const [formateurFilter, setFormateurFilter] = useState("all")
  const [formationFilter, setFormationFilter] = useState("all")
  const [lieuFilter, setLieuFilter] = useState("all")

  const hasFilters = formateurFilter !== "all" || formationFilter !== "all" || lieuFilter !== "all"

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Filtrer le calendrier</h3>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
          <Select value={formateurFilter} onValueChange={setFormateurFilter}>
            <SelectTrigger className="hover:shadow-md transition-shadow">
              <SelectValue placeholder="Formateur" />
            </SelectTrigger>
            <SelectContent className="shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-100">
                Tous les formateurs
              </SelectItem>
              <SelectItem value="jean-dupont" className="hover:bg-blue-50">
                Jean Dupont
              </SelectItem>
              <SelectItem value="marie-martin" className="hover:bg-blue-50">
                Marie Martin
              </SelectItem>
              <SelectItem value="pierre-leroy" className="hover:bg-blue-50">
                Pierre Leroy
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={formationFilter} onValueChange={setFormationFilter}>
            <SelectTrigger className="hover:shadow-md transition-shadow">
              <SelectValue placeholder="Formation" />
            </SelectTrigger>
            <SelectContent className="shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-100">
                Toutes les formations
              </SelectItem>
              <SelectItem value="react" className="hover:bg-purple-50">
                Introduction à React
              </SelectItem>
              <SelectItem value="spring" className="hover:bg-green-50">
                Spring Boot pour débutants
              </SelectItem>
              <SelectItem value="angular" className="hover:bg-red-50">
                Angular Avancé
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={lieuFilter} onValueChange={setLieuFilter}>
            <SelectTrigger className="hover:shadow-md transition-shadow">
              <SelectValue placeholder="Lieu" />
            </SelectTrigger>
            <SelectContent className="shadow-lg">
              <SelectItem value="all" className="hover:bg-gray-100">
                Tous les lieux
              </SelectItem>
              <SelectItem value="salle-a102" className="hover:bg-amber-50">
                Salle A102
              </SelectItem>
              <SelectItem value="salle-b201" className="hover:bg-amber-50">
                Salle B201
              </SelectItem>
              <SelectItem value="en-ligne" className="hover:bg-cyan-50">
                En ligne
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex justify-end animate-fade-in">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={() => {
              setFormateurFilter("all")
              setFormationFilter("all")
              setLieuFilter("all")
            }}
          >
            <X className="h-4 w-4" />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}