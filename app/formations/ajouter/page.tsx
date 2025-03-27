"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, MapPin, Monitor, Users, CreditCard, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function AjouterFormationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formationType, setFormationType] = useState("presentiel")
  const [dateDebut, setDateDebut] = useState<Date>()
  const [dateFin, setDateFin] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Formation créée",
      description: "La formation a été créée avec succès",
      variant: "default"
    })
    router.push("/formations")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 relative">
      {/* Fond animé avec dégradé */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30 animate-gradient-x" />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
            <BookOpen className="h-6 w-6" />
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Ajouter une formation
          </span>
        </h1>
        <p className="text-muted-foreground">Créez une nouvelle formation et configurez ses détails</p>
      </div>

      <Tabs defaultValue="informations" className="space-y-6">
        <TabsList className="bg-background/50 backdrop-blur-sm border">
          <TabsTrigger value="informations" className="relative group">
            Informations
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
          <TabsTrigger value="lieu" className="relative group">
            Lieu
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
          <TabsTrigger value="formateur" className="relative group">
            Formateur
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
          <TabsTrigger value="tarification" className="relative group">
            Tarification
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-data-[state=active]:scale-x-100 transition-transform duration-300" />
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="informations" className="space-y-6">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Informations de base
                </CardTitle>
                <CardDescription>Entrez les informations générales de la formation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="titre" className="flex items-center gap-1">
                    <span>Titre de la formation</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="titre" 
                    placeholder="Titre de la formation" 
                    required 
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Description de la formation" 
                    className="min-h-[120px] focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="categorie" className="flex items-center gap-1">
                      <span>Catégorie</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="developpement">
                      <SelectTrigger id="categorie" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developpement" className="focus:bg-blue-50">Développement</SelectItem>
                        <SelectItem value="management" className="focus:bg-blue-50">Management</SelectItem>
                        <SelectItem value="design" className="focus:bg-blue-50">Design</SelectItem>
                        <SelectItem value="marketing" className="focus:bg-blue-50">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select defaultValue="presentiel" onValueChange={setFormationType}>
                      <SelectTrigger id="type" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presentiel" className="focus:bg-blue-50">Présentiel</SelectItem>
                        <SelectItem value="enligne" className="focus:bg-blue-50">En ligne</SelectItem>
                        <SelectItem value="hybride" className="focus:bg-blue-50">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niveau">Niveau</Label>
                    <Select defaultValue="debutant">
                      <SelectTrigger id="niveau" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant" className="focus:bg-blue-50">Débutant</SelectItem>
                        <SelectItem value="intermediaire" className="focus:bg-blue-50">Intermédiaire</SelectItem>
                        <SelectItem value="avance" className="focus:bg-blue-50">Avancé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duree" className="flex items-center gap-1">
                      <span>Durée totale (heures)</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="duree" 
                      type="number" 
                      min="1" 
                      placeholder="24" 
                      required 
                      className="focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <span>Date de début</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal hover:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                            !dateDebut && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {dateDebut ? format(dateDebut, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-border shadow-lg">
                        <Calendar 
                          mode="single" 
                          selected={dateDebut} 
                          onSelect={setDateDebut} 
                          initialFocus 
                          className="border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      <span>Date de fin</span>
                      <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal hover:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                            !dateFin && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {dateFin ? format(dateFin, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-border shadow-lg">
                        <Calendar 
                          mode="single" 
                          selected={dateFin} 
                          onSelect={setDateFin} 
                          initialFocus 
                          className="border-0"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <span>Horaires</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="time" 
                        defaultValue="09:00" 
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                      <Input 
                        type="time" 
                        defaultValue="17:00" 
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lieu" className="space-y-6">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Lieu de formation
                </CardTitle>
                <CardDescription>Configurez le lieu de la formation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {formationType === "presentiel" || formationType === "hybride" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adresse">Adresse complète</Label>
                      <Textarea 
                        id="adresse" 
                        placeholder="Adresse du lieu de formation" 
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salle">Salle</Label>
                        <Input 
                          id="salle" 
                          placeholder="Numéro ou nom de la salle" 
                          className="focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="capacite">Capacité maximale</Label>
                        <Input 
                          id="capacite" 
                          type="number" 
                          min="1" 
                          placeholder="20" 
                          className="focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {formationType === "enligne" || formationType === "hybride" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lien">Lien de la plateforme</Label>
                      <Input 
                        id="lien" 
                        placeholder="https://..." 
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions de connexion</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Instructions pour se connecter à la formation en ligne"
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formateur" className="space-y-6">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Formateur(s)
                </CardTitle>
                <CardDescription>Sélectionnez le(s) formateur(s) pour cette formation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="formateur-principal" className="flex items-center gap-1">
                    <span>Formateur principal</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="jean-dupont">
                    <SelectTrigger id="formateur-principal" className="focus:ring-2 focus:ring-blue-500/20">
                      <SelectValue placeholder="Sélectionner un formateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jean-dupont" className="focus:bg-blue-50">Jean Dupont</SelectItem>
                      <SelectItem value="marie-martin" className="focus:bg-blue-50">Marie Martin</SelectItem>
                      <SelectItem value="pierre-leroy" className="focus:bg-blue-50">Pierre Leroy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formateurs-assistants">Formateurs assistants</Label>
                  <Select>
                    <SelectTrigger id="formateurs-assistants" className="focus:ring-2 focus:ring-blue-500/20">
                      <SelectValue placeholder="Sélectionner des formateurs assistants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sophie-bernard" className="focus:bg-blue-50">Sophie Bernard</SelectItem>
                      <SelectItem value="thomas-petit" className="focus:bg-blue-50">Thomas Petit</SelectItem>
                      <SelectItem value="julie-moreau" className="focus:bg-blue-50">Julie Moreau</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    La sélection multiple sera disponible dans une version future
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tarification" className="space-y-6">
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 border-b">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Tarification
                </CardTitle>
                <CardDescription>Configurez les options de tarification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="cout">Coût par participant</Label>
                  <div className="flex">
                    <Input 
                      id="cout" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      placeholder="0.00" 
                      className="rounded-r-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <div className="flex items-center justify-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
                      €
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Options de paiement</Label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paiement-complet" />
                      <Label htmlFor="paiement-complet" className="text-sm font-normal leading-none">
                        Paiement complet
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paiement-echelonne" />
                      <Label htmlFor="paiement-echelonne" className="text-sm font-normal leading-none">
                        Paiement échelonné
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prise-en-charge" />
                      <Label htmlFor="prise-en-charge" className="text-sm font-normal leading-none">
                        Prise en charge (OPCO, CPF, etc.)
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/formations")}
                  className="border-muted-foreground/30 hover:border-blue-500/50 hover:text-blue-600"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Créer la formation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}