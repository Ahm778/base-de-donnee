"use client"

import Link from "next/link"
import { PlusCircle, Search, Filter, ChevronDown, Users, Calendar, Award, Star } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormateursList } from "@/components/formateurs-list"
import { FormateursFilters } from "@/components/formateurs-filters"
import { Badge } from "@/components/ui/badge"

export default function FormateursPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 bg-[#f9fafb] dark:bg-[#0f1011]">
      {/* Creative Header with Floating Elements */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-indigo-100/50 dark:bg-indigo-900/10 blur-xl"></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-indigo-600 dark:text-indigo-400">
                <Users className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                Espace <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Formateurs</span>
              </h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Optimisez votre gestion pédagogique avec notre plateforme intelligente
            </p>
          </div>
          <Button asChild variant="default" className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md">
            <Link href="/formateurs/ajouter" className="flex items-center gap-2 group">
              <PlusCircle className="h-4 w-4 transition-all group-hover:rotate-180 duration-300" />
              <span>Ajouter un formateur</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Creative Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg border bg-white dark:bg-gray-800/50 flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Formateurs actifs</p>
            <p className="font-medium text-lg">24</p>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border bg-white dark:bg-gray-800/50 flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Experts certifiés</p>
            <p className="font-medium text-lg">15</p>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border bg-white dark:bg-gray-800/50 flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
            <Star className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Top formateurs</p>
            <p className="font-medium text-lg">8</p>
          </div>
        </div>
        
        <div className="p-3 rounded-lg border bg-white dark:bg-gray-800/50 flex items-center gap-3">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
            <p className="font-medium text-lg">18</p>
          </div>
        </div>
      </div>

      {/* Search and Filters with creative touch */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, compétence..."
            className="pl-9 h-9 text-sm border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1 px-3 border-gray-300 dark:border-gray-600">
            <Filter className="h-3.5 w-3.5" />
            <span>Filtrer</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-2.5 border-gray-300 dark:border-gray-600">
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Content with creative elements */}
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/10 dark:to-gray-800/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300">
                <Users className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Liste des formateurs</span>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                Nouveaux : 3
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              Exporter la liste
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <FormateursFilters />
          </div>
          <div className="divide-y">
            <FormateursList />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}