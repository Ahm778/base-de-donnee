import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function RecentFormations() {
  const formations = [
    {
      id: 1,
      title: "Développement Web Avancé",
      date: "15 mars 2023",
      status: "Terminé",
      participants: 18,
      formateur: {
        name: "Jean Dupont",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      category: "Développement",
    },
    {
      id: 2,
      title: "UX/UI Design Fondamentaux",
      date: "2 avril 2023",
      status: "Terminé",
      participants: 12,
      formateur: {
        name: "Marie Martin",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MM",
      },
      category: "Design",
    },
    {
      id: 3,
      title: "Gestion de Projet Agile",
      date: "10 avril 2023",
      status: "Terminé",
      participants: 15,
      formateur: {
        name: "Pierre Leroy",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "PL",
      },
      category: "Management",
    },
  ]

  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Terminé": return "default";
      case "En cours": return "secondary";
      case "À venir": return "outline";
      default: return "outline";
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Développement": return "bg-blue-100 text-blue-800";
      case "Design": return "bg-purple-100 text-purple-800";
      case "Management": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="space-y-4">
      {formations.map((formation) => (
        <Card 
          key={formation.id} 
          className="p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={formation.formateur.avatar} alt={formation.formateur.name} />
              <AvatarFallback className="font-medium">
                {formation.formateur.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {formation.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(formation.category)}`}>
                      {formation.category}
                    </span>
                  </div>
                </div>
                
                <Badge 
                  variant={getStatusVariant(formation.status)}
                  className="ml-2 shrink-0"
                >
                  {formation.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{formation.formateur.name}</span>
                  <span>•</span>
                  <span>{formation.participants} participants</span>
                </div>
                <span>{formation.date}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}