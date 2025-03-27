"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FormateursFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialisationFilter, setSpecialisationFilter] = useState("all")
  const [disponibiliteFilter, setDisponibiliteFilter] = useState("all")

  const hasFilters = searchTerm || specialisationFilter !== "all" || disponibiliteFilter !== "all"

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-opacity group-focus-within:opacity-0" />
          <Input
            placeholder="Rechercher un formateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 transition-all duration-300 group-focus-within:pl-4 group-focus-within:ring-2 group-focus-within:ring-primary/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:w-[420px]">
          <Select value={specialisationFilter} onValueChange={setSpecialisationFilter}>
            <SelectTrigger className="transition-all hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Spécialisation" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-lg">
              <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10">
                Toutes les spécialisations
              </SelectItem>
              <SelectItem value="dev-web" className="hover:bg-primary/10 focus:bg-primary/10">
                Développement Web
              </SelectItem>
              <SelectItem value="dev-mobile" className="hover:bg-primary/10 focus:bg-primary/10">
                Développement Mobile
              </SelectItem>
              <SelectItem value="design" className="hover:bg-primary/10 focus:bg-primary/10">
                Design
              </SelectItem>
              <SelectItem value="management" className="hover:bg-primary/10 focus:bg-primary/10">
                Management
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={disponibiliteFilter} onValueChange={setDisponibiliteFilter}>
            <SelectTrigger className="transition-all hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Disponibilité" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-lg">
              <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10">
                Toutes les disponibilités
              </SelectItem>
              <SelectItem value="disponible" className="hover:bg-primary/10 focus:bg-primary/10">
                Disponible
              </SelectItem>
              <SelectItem value="occupe" className="hover:bg-primary/10 focus:bg-primary/10">
                Occupé
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setSpecialisationFilter("all")
              setDisponibiliteFilter("all")
            }}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}