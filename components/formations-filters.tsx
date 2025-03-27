"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FormationsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const hasFilters = searchTerm || statusFilter !== "all" || typeFilter !== "all"

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Champ de recherche amélioré */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-all duration-300 group-focus-within:text-primary" />
          <Input
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-8 transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/50"
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
        
        {/* Selecteurs améliorés */}
        <div className="grid grid-cols-2 gap-4 sm:w-[420px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="transition-all hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-lg">
              <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10">
                Tous les statuts
              </SelectItem>
              <SelectItem value="upcoming" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  À venir
                </span>
              </SelectItem>
              <SelectItem value="ongoing" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  En cours
                </span>
              </SelectItem>
              <SelectItem value="completed" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                  Terminé
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="transition-all hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-lg">
              <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10">
                Tous les types
              </SelectItem>
              <SelectItem value="onsite" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  Présentiel
                </span>
              </SelectItem>
              <SelectItem value="online" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                  En ligne
                </span>
              </SelectItem>
              <SelectItem value="hybrid" className="hover:bg-primary/10 focus:bg-primary/10">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Hybride
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bouton de réinitialisation conditionnel avec animation */}
      {hasFilters && (
        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setTypeFilter("all")
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