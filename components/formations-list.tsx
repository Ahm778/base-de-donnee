"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function FormationsList() {
  const formations = [
    {
      id: 1,
      title: "Introduction à React",
      description: "Apprenez les bases de React et créez votre première application",
      image: "/placeholder.svg?height=200&width=400",
      dates: "20-22 mai 2023",
      duration: "21 heures",
      location: "Salle A102",
      formateur: "Jean Dupont",
      participants: 15,
      maxParticipants: 20,
      status: "À venir",
      type: "Présentiel",
    },
    {
      id: 2,
      title: "Spring Boot pour débutants",
      description: "Découvrez comment créer des applications Java avec Spring Boot",
      image: "/placeholder.svg?height=200&width=400",
      dates: "25-27 mai 2023",
      duration: "24 heures",
      location: "En ligne",
      formateur: "Marie Martin",
      participants: 18,
      maxParticipants: 25,
      status: "À venir",
      type: "En ligne",
    },
    {
      id: 3,
      title: "Angular Avancé",
      description: "Maîtrisez les concepts avancés d'Angular pour des applications robustes",
      image: "/placeholder.svg?height=200&width=400",
      dates: "1-3 juin 2023",
      duration: "18 heures",
      location: "Salle B201",
      formateur: "Pierre Leroy",
      participants: 12,
      maxParticipants: 15,
      status: "À venir",
      type: "Présentiel",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {formations.map((formation, index) => (
        <Card 
          key={formation.id} 
          className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <CardHeader className="p-0 relative">
            <div className="relative h-48 w-full">
              <Image 
                src={formation.image || "/placeholder.svg"} 
                alt={formation.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <Badge
                className="absolute right-2 top-2 backdrop-blur-sm"
                variant={
                  formation.status === "À venir" 
                    ? "default" 
                    : formation.status === "En cours" 
                    ? "secondary" 
                    : "outline"
                }
              >
                {formation.status}
              </Badge>
              
              <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                {formation.title}
              </h3>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {formation.description}
            </p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{formation.dates}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{formation.duration}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{formation.location}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Participants</span>
                    <span>{formation.participants}/{formation.maxParticipants}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ 
                        width: `${(formation.participants / formation.maxParticipants) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/5 transition-colors"
              >
                {formation.type}
              </Badge>
              <Badge 
                variant="outline" 
                className="border-purple-500/20 text-purple-500 hover:bg-purple-500/5"
              >
                {formation.formateur}
              </Badge>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="group-hover:border-primary group-hover:text-primary transition-colors"
              asChild
            >
              <Link href={`/formations/${formation.id}`} className="flex items-center gap-1">
                <span>Détails</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </Button>
            
            <Button 
              size="sm" 
              className="transition-all group-hover:shadow-md"
              asChild
            >
              <Link href={`/formations/${formation.id}/gerer`}>
                Gérer
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}