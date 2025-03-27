"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function ParticipantsFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [formationFilter, setFormationFilter] = useState("all")
  const [isFocused, setIsFocused] = useState(false)

  const hasFilters = searchTerm || formationFilter !== "all"

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-all duration-300",
              isFocused ? "text-primary scale-110" : ""
            )} />
            <Input
              placeholder="Rechercher un participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-8 h-11 rounded-xl border-2 border-muted-foreground/20 hover:border-primary/30 focus:border-primary focus-visible:ring-0 transition-all duration-300 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="sm:w-[250px]">
          <Select value={formationFilter} onValueChange={setFormationFilter}>
            <SelectTrigger className="rounded-xl border-2 border-muted-foreground/20 hover:border-primary/30 focus:border-primary h-11 shadow-sm transition-all duration-300">
              <SelectValue placeholder="Formation" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-primary/20 shadow-lg animate-in fade-in zoom-in-95">
              <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg transition-colors">
                Toutes les formations
              </SelectItem>
              <SelectItem value="react" className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg transition-colors">
                Introduction à React
              </SelectItem>
              <SelectItem value="spring" className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg transition-colors">
                Spring Boot pour débutants
              </SelectItem>
              <SelectItem value="angular" className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg transition-colors">
                Angular Avancé
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="flex justify-end animate-in fade-in slide-in-from-right-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setFormationFilter("all")
            }}
            className="rounded-lg border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
          >
            <X className="h-4 w-4 mr-1 text-muted-foreground group-hover:text-primary transition-colors" />
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}