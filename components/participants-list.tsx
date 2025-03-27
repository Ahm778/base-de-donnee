"use client"

import Link from "next/link"
import { MoreHorizontal, Mail, Phone, User, Briefcase, BookOpen } from "lucide-react"

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

export function ParticipantsList() {
  const participants = [
    {
      id: 1,
      name: "Alexandre Dubois",
      email: "alexandre.dubois@example.com",
      phone: "+33 6 12 34 56 78",
      company: "Acme Inc",
      formations: [{ id: 1, name: "Introduction à React", status: "Inscrit" }],
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AD",
    },
    {
      id: 2,
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      phone: "+33 6 23 45 67 89",
      company: "Tech Solutions",
      formations: [
        { id: 2, name: "Spring Boot pour débutants", status: "Inscrit" },
        { id: 3, name: "Angular Avancé", status: "En attente" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
    },
    {
      id: 3,
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      phone: "+33 6 34 56 78 90",
      company: "Dev Agency",
      formations: [
        { id: 1, name: "Introduction à React", status: "Inscrit" },
        { id: 2, name: "Spring Boot pour débutants", status: "Inscrit" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TB",
    },
    {
      id: 4,
      name: "Julie Petit",
      email: "julie.petit@example.com",
      phone: "+33 6 45 67 89 01",
      company: "Design Studio",
      formations: [{ id: 3, name: "Angular Avancé", status: "Inscrit" }],
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
    },
    {
      id: 5,
      name: "Nicolas Moreau",
      email: "nicolas.moreau@example.com",
      phone: "+33 6 56 78 90 12",
      company: "Consulting Group",
      formations: [],
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NM",
    },
  ]

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <Table className="[&_tr:hover]:bg-muted/50 [&_tr:focus-within]:bg-muted/50">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[220px]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Participant</span>
              </div>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Entreprise</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Formations</span>
              </div>
            </TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id} className="transition-all hover:shadow-sm">
              <TableCell className="group">
                <div className="flex items-center gap-3">
                  <Avatar className="transition-transform group-hover:scale-105">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium hover:text-primary transition-colors">
                      <Link href={`/participants/${participant.id}`}>{participant.name}</Link>
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Link 
                    href={`mailto:${participant.email}`} 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{participant.email}</span>
                  </Link>
                  <Link 
                    href={`tel:${participant.phone.replace(/\s/g, '')}`} 
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{participant.phone}</span>
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm">
                  {participant.company}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {participant.formations.length > 0 ? (
                    participant.formations.map((formation) => (
                      <Badge 
                        key={formation.id} 
                        variant="outline"
                        className={`border-primary/20 hover:bg-primary/5 transition-colors ${
                          formation.status === "En attente" ? "border-yellow-500/20 text-yellow-500" : ""
                        }`}
                      >
                        {formation.name}
                        {formation.status === "En attente" && (
                          <span className="ml-1 text-xs">(En attente)</span>
                        )}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="border-dashed text-muted-foreground">
                      Aucune formation
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-primary/10 hover:text-primary"
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
                      Actions pour {participant.name}
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/participants/${participant.id}`}>
                        Voir le profil complet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-4 py-2.5 focus:bg-primary/5">
                      <Link href={`/participants/${participant.id}/modifier`}>
                        Modifier le profil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-muted" />
                    <DropdownMenuItem className="px-4 py-2.5 text-destructive focus:bg-destructive/5 focus:text-destructive">
                      Supprimer le participant
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