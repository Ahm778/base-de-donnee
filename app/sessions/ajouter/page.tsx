"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, Upload, ChevronDown, Users, BookOpen, FileText, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function AjouterSessionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Session créée avec succès",
      description: "La nouvelle session a été ajoutée à votre calendrier",
    })
    router.push("/calendrier")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Créer une nouvelle session
            </h1>
            <p className="text-muted-foreground">Planifiez une session de formation complète</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push("/calendrier")}
            className="hidden sm:flex"
          >
            Retour au calendrier
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Card 1 - Détails de la session */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Détails de la session</CardTitle>
                  <CardDescription>Informations principales de la session</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Label htmlFor="formation" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  Formation parente *
                </Label>
                <Select required>
                  <SelectTrigger id="formation" className="h-11">
                    <SelectValue placeholder="Sélectionner une formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">Introduction à React</SelectItem>
                    <SelectItem value="spring">Spring Boot pour débutants</SelectItem>
                    <SelectItem value="angular">Angular Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                    Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Horaires *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="09:00" required className="h-11" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="17:00" required className="h-11" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="lieu" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Salle / Lien virtuel *
                </Label>
                <Input id="lieu" placeholder="Salle A102 ou lien de visioconférence" required className="h-11" />
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Participants */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Participants</CardTitle>
                  <CardDescription>Liste des apprenants pour cette session</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-indigo-500" />
                    Liste des inscrits
                  </Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    type="button"
                    onClick={() => {
                      if (selectedParticipants.length === 5) {
                        setSelectedParticipants([])
                      } else {
                        setSelectedParticipants(["p1", "p2", "p3", "p4", "p5"])
                      }
                    }}
                  >
                    {selectedParticipants.length === 5 ? "Tout désélectionner" : "Sélectionner tout"}
                  </Button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {[
                    { id: "p1", name: "Alexandre Dubois", email: "alex.dubois@example.com" },
                    { id: "p2", name: "Sophie Martin", email: "sophie.martin@example.com" },
                    { id: "p3", name: "Thomas Bernard", email: "thomas.bernard@example.com" },
                    { id: "p4", name: "Julie Petit", email: "julie.petit@example.com" },
                    { id: "p5", name: "Nicolas Moreau", email: "nicolas.moreau@example.com" },
                  ].map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <Checkbox
                        id={participant.id}
                        checked={selectedParticipants.includes(participant.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedParticipants([...selectedParticipants, participant.id])
                          } else {
                            setSelectedParticipants(selectedParticipants.filter((id) => id !== participant.id))
                          }
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <Label htmlFor={participant.id} className="text-sm font-medium truncate">
                          {participant.name}
                        </Label>
                        <p className="text-xs text-muted-foreground truncate">{participant.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 - Contenu */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Contenu pédagogique</CardTitle>
                  <CardDescription>Modules et ressources de la session</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Label htmlFor="modules" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                  Modules couverts
                </Label>
                <Select>
                  <SelectTrigger id="modules" className="h-11">
                    <SelectValue placeholder="Sélectionner des modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="module1">Introduction et concepts de base</SelectItem>
                    <SelectItem value="module2">Composants et props</SelectItem>
                    <SelectItem value="module3">État et cycle de vie</SelectItem>
                    <SelectItem value="module4">Gestion des formulaires</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  La sélection multiple sera disponible dans une version future
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="objectifs" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Objectifs de la session *
                </Label>
                <Textarea
                  id="objectifs"
                  placeholder="Décrivez les objectifs pédagogiques de cette session..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-1">
                  <Upload className="h-4 w-4 text-purple-500" />
                  Documents partagés
                </Label>
                <div className="flex items-center gap-3">
                  <Input id="documents" type="file" multiple className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("documents")?.click()}
                    className="w-full h-11"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger des documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Évaluation */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">Évaluation</CardTitle>
                  <CardDescription>Quiz et travaux pour cette session</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Label htmlFor="quiz" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M3 3h18v18H3z"></path>
                    <path d="M8 12h8"></path>
                    <path d="M8 8h8"></path>
                    <path d="M8 16h8"></path>
                  </svg>
                  Quiz / Test associé
                </Label>
                <Select>
                  <SelectTrigger id="quiz" className="h-11">
                    <SelectValue placeholder="Sélectionner un quiz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz1">Quiz d'introduction à React</SelectItem>
                    <SelectItem value="quiz2">Test sur les composants React</SelectItem>
                    <SelectItem value="quiz3">Évaluation finale React</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="devoirs" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Devoirs à rendre
                </Label>
                <Textarea 
                  id="devoirs" 
                  placeholder="Décrivez les devoirs ou travaux pratiques à rendre..." 
                  className="min-h-[120px]" 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => router.push("/calendrier")}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
              >
                Créer la session
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}