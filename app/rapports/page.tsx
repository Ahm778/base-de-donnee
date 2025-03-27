"use client"

import { useState } from "react"
import { Download, BarChart, PieChart, LineChart, Filter, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RapportFilters } from "@/components/rapport-filters"
import { RapportFormations } from "@/components/rapport-formations"
import { RapportParticipants } from "@/components/rapport-participants"
import { RapportFormateurs } from "@/components/rapport-formateurs"

export default function RapportsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("formations")

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Tableau de bord des rapports</h1>
          <p className="text-muted-foreground mt-1">Analyse complète des données de formation</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={showFilters ? "default" : "outline"} 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtres
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
            <Download className="h-4 w-4 mr-2" />
            Exporter le rapport
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <RapportFilters />
          </CardContent>
        </Card>
      )}

      <Tabs 
        defaultValue="formations" 
        className="space-y-6"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="bg-transparent p-0 h-auto gap-2">
          <TabsTrigger 
            value="formations" 
            className={`px-4 py-2 rounded-lg ${activeTab === "formations" ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            Formations
          </TabsTrigger>
          <TabsTrigger 
            value="participants" 
            className={`px-4 py-2 rounded-lg ${activeTab === "participants" ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            Participants
          </TabsTrigger>
          <TabsTrigger 
            value="formateurs" 
            className={`px-4 py-2 rounded-lg ${activeTab === "formateurs" ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            Formateurs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Formations Actives</CardTitle>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +2
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Taux de Complétion</CardTitle>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                  <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">87%</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +2%
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Satisfaction Moyenne</CardTitle>
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.6<span className="text-xl text-gray-500">/5</span></div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +0.2
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Détails des formations</CardTitle>
              <CardDescription>Analyse complète des performances des formations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RapportFormations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Participants Inscrits</CardTitle>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">245</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +18
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Taux de Présence</CardTitle>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                  <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">92%</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +1%
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Moyenne des Notes</CardTitle>
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">16<span className="text-xl text-gray-500">/20</span></div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +0.5
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Analyse des participants</CardTitle>
              <CardDescription>Performance et engagement des apprenants</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RapportParticipants />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formateurs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Formateurs Actifs</CardTitle>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">8</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +1
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Heures de Formation</CardTitle>
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                  <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">320</div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +24
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-500">Évaluation Moyenne</CardTitle>
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <LineChart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.7<span className="text-xl text-gray-500">/5</span></div>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    +0.1
                  </span>
                  <span className="text-muted-foreground text-xs ml-1">depuis la période précédente</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Performance des formateurs</CardTitle>
              <CardDescription>Analyse des résultats et de la satisfaction</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RapportFormateurs />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}