import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"

export function UpcomingFormations() {
  const formations = [
    {
      id: 1,
      title: "Introduction à React",
      date: "20 mai 2023",
      time: "09:00 - 17:00",
      location: "Salle A102",
      status: "À venir",
      progress: 0,
      participants: 15,
      maxParticipants: 20,
      category: "Développement",
    },
    {
      id: 2,
      title: "Spring Boot pour débutants",
      date: "25 mai 2023",
      time: "09:00 - 17:00",
      location: "En ligne",
      status: "À venir",
      progress: 0,
      participants: 18,
      maxParticipants: 25,
      category: "Backend",
    },
    {
      id: 3,
      title: "Angular Avancé",
      date: "1 juin 2023",
      time: "09:00 - 17:00",
      location: "Salle B201",
      status: "À venir",
      progress: 0,
      participants: 12,
      maxParticipants: 15,
      category: "Frontend",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Développement": return "bg-blue-100 text-blue-800";
      case "Frontend": return "bg-purple-100 text-purple-800";
      case "Backend": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="space-y-4">
      {formations.map((formation) => (
        <Card 
          key={formation.id} 
          className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-muted-foreground/20"
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {formation.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(formation.category)}`}>
                      {formation.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formation.date} • {formation.time}
                  </p>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">
                  {formation.status}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Lieu</p>
                    <p className="font-medium">{formation.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-medium">
                      {formation.participants}/{formation.maxParticipants} (
                      {Math.round((formation.participants / formation.maxParticipants) * 100)}%
                      )
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{formation.progress}%</span>
                </div>
                <Progress 
                  value={formation.progress} 
                  className="h-2 bg-muted [&>div]:bg-primary"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Voir les détails
                </Button>
                <Button size="sm" className="w-full sm:w-auto">
                  Gérer la formation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}