"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Participant {
  id: number
  name: string
  entreprise: string
  formations: number
  presence: number
  moyenne: number
  certificats: number
  avatar?: string
  lastActivity?: string | null
}

interface EntrepriseStats {
  [key: string]: number
}

export function RapportParticipants() {
  const participants: Participant[] = [
    {
      id: 1,
      name: "Alexandre Dubois",
      entreprise: "Acme Inc",
      formations: 2,
      presence: 95,
      moyenne: 17.5,
      certificats: 1,
      avatar: "/avatars/01.png",
      lastActivity: "2023-06-15"
    },
    {
      id: 2,
      name: "Sophie Martin",
      entreprise: "Tech Solutions",
      formations: 3,
      presence: 90,
      moyenne: 16.8,
      certificats: 2,
      avatar: "/avatars/02.png",
      lastActivity: "2023-06-18"
    },
    {
      id: 3,
      name: "Thomas Bernard",
      entreprise: "Dev Agency",
      formations: 2,
      presence: 100,
      moyenne: 18.2,
      certificats: 2,
      avatar: "/avatars/03.png",
      lastActivity: "2023-06-20"
    },
    {
      id: 4,
      name: "Julie Petit",
      entreprise: "Design Studio",
      formations: 1,
      presence: 85,
      moyenne: 15.5,
      certificats: 0,
      avatar: "/avatars/04.png",
      lastActivity: "2023-05-28"
    },
    {
      id: 5,
      name: "Nicolas Moreau",
      entreprise: "Consulting Group",
      formations: 0,
      presence: 0,
      moyenne: 0,
      certificats: 0,
      avatar: "/avatars/05.png",
      lastActivity: null
    },
  ]

  // Statistiques par entreprise pour le graphique
  const entreprises: EntrepriseStats = participants.reduce<EntrepriseStats>((acc, participant) => {
    if (!acc[participant.entreprise]) {
      acc[participant.entreprise] = 0
    }
    acc[participant.entreprise]++
    return acc
  }, {})

  // Fonction pour styliser le composant Progress
  const CustomProgress = ({ value, className = "", indicatorClassName = "" }: { 
    value: number, 
    className?: string,
    indicatorClassName?: string 
  }) => {
    return (
      <div className={`h-2 bg-gray-200 rounded-full ${className}`}>
        <div 
          className={`h-full rounded-full ${indicatorClassName}`}
          style={{ width: `${value}%` }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-600">Participants total</CardDescription>
            <CardTitle className="text-3xl text-blue-800">{participants.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-blue-600">
              +12% par rapport au mois dernier
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-600">Certificats délivrés</CardDescription>
            <CardTitle className="text-3xl text-green-800">
              {participants.reduce((sum, p) => sum + p.certificats, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-green-600">
              Taux de réussite: 82%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-600">Moyenne générale</CardDescription>
            <CardTitle className="text-3xl text-purple-800">
              {(
                participants.reduce((sum, p) => sum + p.moyenne, 0) / 
                (participants.filter(p => p.moyenne > 0).length || 1)
              ).toFixed(1)}/20
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-purple-600">
              +1.2 points vs dernier trimestre
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-600">Taux de présence</CardDescription>
            <CardTitle className="text-3xl text-amber-800">
              {(
                participants.reduce((sum, p) => sum + p.presence, 0) / 
                (participants.filter(p => p.presence > 0).length || 1)
              ).toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600">
              Engagement élevé
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Répartition par entreprise</CardTitle>
            <CardDescription>Nombre de participants par entreprise</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="h-full flex flex-col">
              {Object.entries(entreprises).map(([entreprise, count]) => (
                <div key={entreprise} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{entreprise}</span>
                    <span className="text-muted-foreground">{count} participant(s)</span>
                  </div>
                  <CustomProgress 
                    value={(count / participants.length) * 100} 
                    className="bg-gray-100"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activité récente</CardTitle>
            <CardDescription>Dernières participations aux formations</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <div className="space-y-4">
              {participants
                .filter((p): p is Participant & { lastActivity: string } => p.lastActivity !== null && p.lastActivity !== undefined)
                .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
                .slice(0, 4)
                .map(participant => (
                  <div key={participant.id} className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                      {participant.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Dernière activité: {new Date(participant.lastActivity).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {participant.formations} formation(s)
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Liste des participants</CardTitle>
              <CardDescription>Détails et statistiques des participants</CardDescription>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {participants.length} enregistrements
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Participant</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead className="text-center">Formations</TableHead>
                <TableHead className="text-center">Présence</TableHead>
                <TableHead className="text-center">Moyenne</TableHead>
                <TableHead className="text-center">Certificats</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium mr-3">
                        {participant.name.charAt(0)}
                      </div>
                      {participant.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {participant.entreprise}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {participant.formations > 0 ? (
                      <span className="font-medium">{participant.formations}</span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {participant.presence > 0 ? (
                      <div className="flex items-center justify-center">
                        <CustomProgress 
                          value={participant.presence} 
                          className="w-16 bg-gray-200 mr-2"
                          indicatorClassName={
                            participant.presence > 90 ? "bg-green-500" : 
                            participant.presence > 70 ? "bg-amber-500" : "bg-red-500"
                          }
                        />
                        <span>{participant.presence}%</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {participant.moyenne > 0 ? (
                      <Badge 
                        variant="outline" 
                        className={
                          participant.moyenne > 16 ? "border-green-200 bg-green-50 text-green-700" :
                          participant.moyenne > 14 ? "border-amber-200 bg-amber-50 text-amber-700" :
                          "border-red-200 bg-red-50 text-red-700"
                        }
                      >
                        {participant.moyenne}/20
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {participant.certificats > 0 ? (
                      <Badge className="bg-blue-500 text-white">
                        {participant.certificats}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {participant.lastActivity ? (
                      <Badge variant="outline" className="text-xs">
                        Actif
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-gray-100">
                        Inactif
                      </Badge>
                    )}
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