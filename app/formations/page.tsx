"use client"

import Link from "next/link"
import { PlusCircle, Search, Calendar, BookOpen, Filter, ChevronDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormationsList } from "@/components/formations-list"
import { FormationsFilters } from "@/components/formations-filters"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function FormationsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 relative">
      {/* Fond animé avec dégradé */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30 animate-gradient-x" />
      </div>

      {/* Header avec icône colorée */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            <span className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
              <BookOpen className="h-6 w-6" />
            </span>
            Formations
          </h1>
          <p className="text-muted-foreground">Gérez votre catalogue de formations et sessions</p>
        </div>
        <Button asChild className="w-full md:w-auto shadow-md hover:shadow-lg transition-all duration-300 group bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white">
          <Link href="/formations/ajouter">
            <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
            <span>Créer une formation</span>
          </Link>
        </Button>
      </div>

      {/* Barre d'actions avec effets colorés */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors duration-200" />
          <Input
            placeholder="Rechercher une formation..."
            className="pl-9 shadow-sm h-10 focus:ring-2 focus:ring-blue-500/30 transition-all border-muted-foreground/30 hover:border-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 gap-2 border-muted-foreground/30 hover:border-blue-500/50 hover:text-blue-600">
            <Calendar className="h-4 w-4" />
            Calendrier
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 gap-1 border-muted-foreground/30 hover:border-purple-500/50 hover:text-purple-600">
                <Filter className="h-4 w-4" />
                Filtres
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border border-muted-foreground/20 shadow-lg">
              <DropdownMenuItem className="focus:text-blue-600 focus:bg-blue-50">
                <span>Par date</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-purple-600 focus:bg-purple-50">
                <span>Par catégorie</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-green-600 focus:bg-green-50">
                <span>Par statut</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:text-orange-600 focus:bg-orange-50">
                <span>Par difficulté</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Onglets avec indicateur coloré */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="grid w-full grid-cols-3 md:w-fit bg-background/80 backdrop-blur-sm border border-muted-foreground/20 shadow-sm">
            <TabsTrigger value="all" className="relative group data-[state=active]:text-blue-600">
              Toutes
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">24</Badge>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
            </TabsTrigger>
            <TabsTrigger value="active" className="relative group data-[state=active]:text-green-600">
              Actives
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">18</Badge>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-teal-500 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
            </TabsTrigger>
            <TabsTrigger value="archived" className="relative group data-[state=active]:text-orange-600">
              Archivées
              <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">6</Badge>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
            </TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Mis à jour à l'instant
          </div>
        </div>

        {/* Contenu principal avec carte améliorée */}
        <TabsContent value="all" className="space-y-6">
          <Card className="overflow-hidden border border-muted-foreground/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50/50 to-purple-50/50 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-3">
                  <span className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-2 rounded-lg">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Catalogue des formations
                  </span>
                  <Badge variant="outline" className="border-blue-500 bg-blue-50 text-blue-600">
                    24 formations
                  </Badge>
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Trier
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-purple-600">
                    Exporter la liste
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 pb-0">
                <FormationsFilters />
              </div>
              <div className="border-t border-muted-foreground/10">
                <FormationsList />
              </div>
            </CardContent>
          </Card>

          {/* Statistiques supplémentaires avec dégradés */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Formations populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['React Avancé', 'UX/UI Design', 'DevOps'].map((course, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{course}</span>
                      <span className="text-xs text-blue-600">{85 + i * 5}% complétion</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Participation moyenne</span>
                      <span className="font-medium text-purple-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-purple-200 [&>div]:bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Satisfaction</span>
                      <span className="font-medium text-purple-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-purple-200 [&>div]:bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Progression mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">+12%</div>
                <p className="text-xs text-green-600 mt-2">Par rapport au mois dernier</p>
                <div className="flex gap-4 mt-3">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Nouvelles inscriptions</div>
                    <div className="text-lg font-semibold text-green-700">24</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Formations terminées</div>
                    <div className="text-lg font-semibold text-green-700">18</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Autres onglets avec styles cohérents */}
        <TabsContent value="active">
          <Card className="overflow-hidden border border-muted-foreground/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-green-50/50 to-teal-50/50 px-6 py-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <span className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-2 rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                  Formations actives
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Liste des formations actives
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card className="overflow-hidden border border-muted-foreground/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b bg-gradient-to-r from-orange-50/50 to-amber-50/50 px-6 py-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-3">
                <span className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-2 rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                  Formations archivées
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Liste des formations archivées
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}