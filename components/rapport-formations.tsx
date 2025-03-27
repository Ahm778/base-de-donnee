"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RapportFormations() {
  const formations = [
    {
      id: 1,
      title: "Introduction à React",
      categorie: "Développement",
      participants: 15,
      maxParticipants: 20,
      completion: 100,
      satisfaction: 4.5,
      status: "Terminé",
      date: "15-30 Mars 2023"
    },
    {
      id: 2,
      title: "Spring Boot pour débutants",
      categorie: "Développement",
      participants: 18,
      maxParticipants: 25,
      completion: 72,
      satisfaction: 4.7,
      status: "En cours",
      date: "1-15 Avril 2023"
    },
    {
      id: 3,
      title: "Angular Avancé",
      categorie: "Développement",
      participants: 12,
      maxParticipants: 15,
      completion: 0,
      satisfaction: 0,
      status: "À venir",
      date: "1-15 Mai 2023"
    },
    {
      id: 4,
      title: "UX/UI Design Fondamentaux",
      categorie: "Design",
      participants: 14,
      maxParticipants: 20,
      completion: 100,
      satisfaction: 4.8,
      status: "Terminé",
      date: "10-25 Février 2023"
    },
    {
      id: 5,
      title: "Gestion de Projet Agile",
      categorie: "Management",
      participants: 16,
      maxParticipants: 20,
      completion: 85,
      satisfaction: 4.6,
      status: "En cours",
      date: "5-20 Avril 2023"
    },
  ]

  const stats = [
    {
      title: "Total Formations",
      value: formations.length,
      icon: BookOpen,
      trend: "12% vs mois dernier",
      color: "text-blue-600"
    },
    {
      title: "Taux de complétion",
      value: `${Math.round(formations.reduce((acc, curr) => acc + curr.completion, 0) / formations.length)}%`,
      icon: CheckCircle,
      trend: "8% vs mois dernier",
      color: "text-green-600"
    },
    {
      title: "Satisfaction moyenne",
      value: formations.filter(f => f.satisfaction > 0).length > 0 
        ? `${formations.filter(f => f.satisfaction > 0).reduce((acc, curr) => acc + curr.satisfaction, 0) / formations.filter(f => f.satisfaction > 0).length}/5` 
        : "N/A",
      icon: Star,
      trend: "0.2 vs mois dernier",
      color: "text-amber-600"
    },
    {
      title: "Taux d'occupation",
      value: `${Math.round((formations.reduce((acc, curr) => acc + curr.participants, 0) / formations.reduce((acc, curr) => acc + curr.maxParticipants, 0)) * 100)}%`,
      icon: TrendingUp,
      trend: "5% vs mois dernier",
      color: "text-purple-600"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.trend.includes('-') ? "text-red-500" : "text-green-500"}>
                  {stat.trend}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphique de répartition */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>Nombre de formations par catégorie</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mois
              </Button>
              <Button size="sm">
                Année
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Graphique de répartition ici</p>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des formations */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des formations</CardTitle>
              <CardDescription>Détails et statistiques des formations</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Complétion</TableHead>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formations.map((formation) => (
                <TableRow key={formation.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{formation.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {formation.categorie}
                    </Badge>
                  </TableCell>
                  <TableCell>{formation.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>
                        {formation.participants}/{formation.maxParticipants}
                      </span>
                      <Progress 
                        value={(formation.participants / formation.maxParticipants) * 100} 
                        className="h-2 w-20 bg-gray-200 [&>div]:bg-blue-500"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={formation.completion} className="h-2 w-20 bg-gray-200 [&>div]:bg-green-500" />
                      <span className="text-sm font-medium">{formation.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formation.satisfaction > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium">{formation.satisfaction}</span>
                        <span className="text-muted-foreground text-sm">/5</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        formation.status === "Terminé"
                          ? "default"
                          : formation.status === "En cours"
                            ? "secondary"
                            : "outline"
                      }
                      className="flex items-center gap-1"
                    >
                      {formation.status === "En cours" && <Clock className="h-3 w-3" />}
                      {formation.status === "Terminé" && <CheckCircle className="h-3 w-3" />}
                      {formation.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}