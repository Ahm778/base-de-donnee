"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, BookOpen, User, BarChart2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function RapportFormateurs() {
  const formateurs = [
    {
      id: 1,
      name: "Jean Dupont",
      specialisations: ["Développement Web", "React", "JavaScript"],
      formations: 12,
      heures: 96,
      evaluation: 4.8,
      avatar: "/avatars/01.png"
    },
    {
      id: 2,
      name: "Marie Martin",
      specialisations: ["UX/UI Design", "Figma", "Adobe XD"],
      formations: 8,
      heures: 64,
      evaluation: 4.6,
      avatar: "/avatars/02.png"
    },
    {
      id: 3,
      name: "Pierre Leroy",
      specialisations: ["Java", "Spring Boot", "Microservices"],
      formations: 15,
      heures: 120,
      evaluation: 4.9,
      avatar: "/avatars/03.png"
    },
    {
      id: 4,
      name: "Sophie Bernard",
      specialisations: ["Management", "Agile", "Scrum"],
      formations: 9,
      heures: 72,
      evaluation: 4.7,
      avatar: "/avatars/04.png"
    },
    {
      id: 5,
      name: "Thomas Petit",
      specialisations: ["Développement Mobile", "Flutter", "React Native"],
      formations: 6,
      heures: 48,
      evaluation: 4.5,
      avatar: "/avatars/05.png"
    },
  ]

  const maxHeures = Math.max(...formateurs.map(f => f.heures))

  return (
    <div className="space-y-6">
      {/* Carte de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Formateurs</CardTitle>
            <User className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{formateurs.length}</div>
            <p className="text-xs text-blue-500">Total formateurs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Formations</CardTitle>
            <BookOpen className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {formateurs.reduce((acc, curr) => acc + curr.formations, 0)}
            </div>
            <p className="text-xs text-green-500">Total formations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">Heures</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">
              {formateurs.reduce((acc, curr) => acc + curr.heures, 0)}
            </div>
            <p className="text-xs text-amber-500">Total heures</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">Évaluation moyenne</CardTitle>
            <Star className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {(formateurs.reduce((acc, curr) => acc + curr.evaluation, 0) / formateurs.length).toFixed(1)}
            </div>
            <p className="text-xs text-purple-500">Moyenne sur 5</p>
          </CardContent>
        </Card>
      </div>

      {/* Carte graphique */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Répartition des heures par formateur</CardTitle>
              <CardDescription>Visualisation du volume horaire par formateur</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">
                Mois
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Trimestre
              </Button>
              <Button size="sm" className="text-xs">
                Année
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Graphique de répartition des heures</p>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des formateurs */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Liste des formateurs</CardTitle>
              <CardDescription>Détails et statistiques des formateurs</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Formateur</TableHead>
                <TableHead>Spécialisations</TableHead>
                <TableHead className="text-center">Formations</TableHead>
                <TableHead className="w-[200px]">Heures</TableHead>
                <TableHead className="w-[180px]">Évaluation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formateurs.map((formateur) => (
                <TableRow key={formateur.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {formateur.avatar ? (
                          <img src={formateur.avatar} alt={formateur.name} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <span>{formateur.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {formateur.specialisations.map((specialisation, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs py-1 px-2 rounded-md border-gray-200"
                        >
                          {specialisation}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                      {formateur.formations}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Progress 
                        value={(formateur.heures / maxHeures) * 100} 
                        className="h-2 bg-gray-200 [&>div]:bg-blue-500"
                      />
                      <span className="text-sm font-medium w-12 text-right">
                        {formateur.heures}h
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
                      <span className="font-medium mr-1">{formateur.evaluation}</span>
                      <span className="text-sm text-gray-500">/5</span>
                      {formateur.evaluation >= 4.8 && (
                        <Badge variant="default" className="ml-2 bg-green-100 text-green-800 text-xs">
                          Top
                        </Badge>
                      )}
                    </div>
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