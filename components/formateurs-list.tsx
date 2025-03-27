"use client"

import Link from "next/link"
import { MoreHorizontal, Mail, Phone, Star, Calendar, FileText } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function FormateursList() {
  const formateurs = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      phone: "+33 6 12 34 56 78",
      specialisations: ["Développement Web", "React", "JavaScript"],
      experience: "8 ans",
      rating: 4.8,
      disponibilite: "Disponible",
      formations: 12,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@example.com",
      phone: "+33 6 23 45 67 89",
      specialisations: ["UX/UI Design", "Figma", "Adobe XD"],
      experience: "6 ans",
      rating: 4.6,
      disponibilite: "Occupé",
      formations: 8,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MM",
    },
    {
      id: 3,
      name: "Pierre Leroy",
      email: "pierre.leroy@example.com",
      phone: "+33 6 34 56 78 90",
      specialisations: ["Java", "Spring Boot", "Microservices"],
      experience: "10 ans",
      rating: 4.9,
      disponibilite: "Disponible",
      formations: 15,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PL",
    },
    {
      id: 4,
      name: "Sophie Bernard",
      email: "sophie.bernard@example.com",
      phone: "+33 6 45 67 89 01",
      specialisations: ["Management", "Agile", "Scrum"],
      experience: "7 ans",
      rating: 4.7,
      disponibilite: "Disponible",
      formations: 9,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SB",
    },
    {
      id: 5,
      name: "Thomas Petit",
      email: "thomas.petit@example.com",
      phone: "+33 6 56 78 90 12",
      specialisations: ["Développement Mobile", "Flutter", "React Native"],
      experience: "5 ans",
      rating: 4.5,
      disponibilite: "Occupé",
      formations: 6,
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TP",
    },
  ]

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <Table className="[&_tr:hover]:bg-muted/50 [&_tr:focus-within]:bg-muted/50">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[280px]">Formateur</TableHead>
            <TableHead>Spécialisations</TableHead>
            <TableHead className="w-[120px]">Expérience</TableHead>
            <TableHead className="w-[120px]">Évaluation</TableHead>
            <TableHead className="w-[140px]">Disponibilité</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formateurs.map((formateur) => (
            <TableRow key={formateur.id} className="transition-all hover:shadow-sm focus-within:shadow-sm">
              <TableCell className="group">
                <div className="flex items-center gap-3">
                  <Avatar className="transition-transform group-hover:scale-105">
                    <AvatarImage src={formateur.avatar} alt={formateur.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                      {formateur.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium hover:text-primary transition-colors">
                      <Link href={`/formateurs/${formateur.id}`}>{formateur.name}</Link>
                    </p>
                    <div className="flex flex-col text-xs text-muted-foreground">
                      <Link 
                        href={`mailto:${formateur.email}`} 
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        <span>{formateur.email}</span>
                      </Link>
                      <Link 
                        href={`tel:${formateur.phone.replace(/\s/g, '')}`} 
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{formateur.phone}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {formateur.specialisations.map((specialisation, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-primary/20 hover:bg-primary/5 transition-colors"
                    >
                      {specialisation}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center justify-center h-8 px-3 rounded-full bg-muted text-sm font-medium">
                  {formateur.experience}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <Star className="h-5 w-5 fill-yellow-400/20 text-yellow-400/50" />
                    <Star 
                      className="absolute top-0 left-0 h-5 w-5 fill-yellow-400 text-yellow-400" 
                      style={{ clipPath: `inset(0 ${100 - (formateur.rating * 20)}% 0 0)` }}
                    />
                  </div>
                  <span className="font-medium">{formateur.rating}</span>
                  <span className="text-muted-foreground text-sm">/5</span>
                </div>
              </TableCell>
              <TableCell>
              <Badge variant={formateur.disponibilite === "Disponible" ? "default" : "secondary"}>
  {formateur.disponibilite}
</Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="rounded-xl shadow-lg border-none min-w-[220px] py-2"
                  >
                    <DropdownMenuLabel className="px-4 py-1.5 text-sm font-normal text-muted-foreground">
                      Actions pour {formateur.name}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/formateurs/${formateur.id}`} className="flex items-center">
                        <span>Voir le profil complet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/formateurs/${formateur.id}/modifier`} className="flex items-center">
                        <span>Modifier le profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-muted" />
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/formateurs/${formateur.id}/disponibilites`} className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        <span>Voir les disponibilités</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/formateurs/${formateur.id}/formations`} className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-primary" />
                        <span>Formations ({formateur.formations})</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-muted" />
                    <DropdownMenuItem className="px-4 py-2.5 text-destructive focus:bg-destructive/5 focus:text-destructive">
                      Supprimer le formateur
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}