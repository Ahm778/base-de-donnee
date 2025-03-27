"use client"

import { useState, useEffect } from "react"
import { BookOpen, Clock, Users, UserCheck, TrendingUp, BarChart, ChevronRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentFormations } from "@/components/recent-formations"
import { UpcomingFormations } from "@/components/upcoming-formations"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("admin")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin"
    setUserRole(role)
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Stats data
  const stats = [
    { title: "Formations Actives", value: "12", change: "+2", icon: BookOpen, color: "text-blue-500" },
    { title: "Participants Inscrits", value: "245", change: "+18", icon: Users, color: "text-green-500" },
    { title: "Taux de Complétion", value: "87%", change: "+2%", icon: UserCheck, color: "text-purple-500" },
    { title: "Heures de Formation", value: "320", change: "+24", icon: Clock, color: "text-orange-500" }
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <DashboardHeader />
      
      {/* Animated gradient background for the header */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 -z-10 opacity-30" />

      <Tabs defaultValue="overview" className="space-y-6 relative">
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="overview" className="relative group">
            Vue d'ensemble
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
          <TabsTrigger value="analytics" className="relative group">
            Statistiques
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
          <TabsTrigger value="reports" className="relative group">
            Rapports
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid with hover effects */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-muted rounded animate-pulse" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span className="text-green-500">{stat.change}</span>
                        <span className="ml-1">depuis le mois dernier</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main content area */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Formations à venir</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Voir tout <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <UpcomingFormations />
              </CardContent>
            </Card>

            <Card className="col-span-3 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Formations récentes</CardTitle>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Voir tout <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <RecentFormations />
              </CardContent>
            </Card>
          </div>

          {/* Additional metrics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progression des participants</CardTitle>
                <CardDescription>Moyenne de complétion par formation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Formation React', 'Formation Node.js', 'Formation UX/UI', 'Formation DevOps'].map((course, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{course}</span>
                        <span>{75 + i * 5}%</span>
                      </div>
                      <Progress value={75 + i * 5} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Les dernières actions sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Nouvelle inscription", user: "Jean Dupont", time: "2 min ago" },
                    { action: "Formation complétée", user: "Marie Martin", time: "10 min ago" },
                    { action: "Paiement reçu", user: "Pierre Lambert", time: "1h ago" },
                    { action: "Feedback soumis", user: "Sophie Bernard", time: "2h ago" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.user} · {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Statistiques des formations</CardTitle>
              <CardDescription>Analyse des formations et des participants sur les 30 derniers jours</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-grid-small-[#8882]/20 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Visualisation des données</h3>
                <p className="text-muted-foreground max-w-md">
                  Les graphiques interactifs seront affichés ici pour analyser les performances des formations.
                </p>
                <Button>Générer un rapport</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Rapports</CardTitle>
              <CardDescription>Générez et consultez les rapports de formation</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-dot-[#8882]/20 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]" />
              <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                <TrendingUp className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Rapports détaillés</h3>
                <p className="text-muted-foreground max-w-md">
                  Exportez des rapports personnalisés pour analyser les performances globales.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline">Télécharger un exemple</Button>
                  <Button>Créer un rapport</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}