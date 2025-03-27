"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, User, Mail, Phone, Home, Briefcase, GraduationCap, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AjouterParticipantPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("informations")
  const [completion, setCompletion] = useState(25)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setCompletion(prev => Math.min(prev + 5, 95))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCompletion(tab === "informations" ? 25 : tab === "coordonnees" ? 50 : tab === "professionnelles" ? 75 : 95)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Participant créé",
      description: "Le nouveau participant a été ajouté avec succès",
    })
    router.push("/participants")
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header avec progression */}
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nouveau Participant
            </span>
          </h1>
          <p className="text-muted-foreground">
            Complétez les informations pour créer un nouveau profil
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Progression {completion}%
            </span>
            {completion > 80 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Presque terminé !
              </Badge>
            )}
          </div>
          <Progress value={completion} className="h-2 [&>div]:bg-gradient-to-r from-blue-500 to-indigo-500" />
        </div>
      </div>

      <Tabs 
        defaultValue="informations" 
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="informations" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-md"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Infos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="coordonnees" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-md"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Coordonnées</span>
          </TabsTrigger>
          <TabsTrigger 
            value="professionnelles" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-md"
          >
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Pro</span>
          </TabsTrigger>
          <TabsTrigger 
            value="pedagogiques" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400 rounded-md"
          >
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Pédagogie</span>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="informations" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                    <User className="h-5 w-5" />
                  </div>
                  <span>Identité</span>
                </CardTitle>
                <CardDescription>
                  Informations personnelles et civiles du participant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo de profil */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <Avatar className="h-20 w-20 border-2 border-white shadow-lg ring-2 ring-blue-100 dark:ring-blue-900/30">
                      <AvatarImage src={previewImage || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300">
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    {previewImage && (
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="photo" className="cursor-pointer">
                      <Button
                        type="button"
                        variant={previewImage ? "outline" : "default"}
                        className="gap-2 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
                        onClick={() => document.getElementById("photo")?.click()}
                      >
                        <Upload className="h-4 w-4" />
                        {previewImage ? "Changer la photo" : "Ajouter une photo"}
                      </Button>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      JPEG, PNG ou GIF (max. 5MB)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="flex items-center gap-1">
                      Nom
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nom"
                      placeholder="Nom du participant"
                      required
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prenom" className="flex items-center gap-1">
                      Prénom
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="prenom"
                      placeholder="Prénom du participant"
                      required
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date-naissance">Date de naissance</Label>
                    <Input
                      id="date-naissance"
                      type="date"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select>
                      <SelectTrigger 
                        id="genre"
                        className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                      >
                        <SelectValue placeholder="Sélectionner un genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                        <SelectItem value="non-precise">Ne pas préciser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalite">Nationalité</Label>
                  <Select>
                    <SelectTrigger 
                      id="nationalite"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    >
                      <SelectValue placeholder="Sélectionner une nationalité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="francaise">Française</SelectItem>
                      <SelectItem value="belge">Belge</SelectItem>
                      <SelectItem value="suisse">Suisse</SelectItem>
                      <SelectItem value="canadienne">Canadienne</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coordonnees" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>Coordonnées</span>
                </CardTitle>
                <CardDescription>
                  Comment contacter ce participant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    Email
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemple.com"
                    required
                    className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="flex items-center gap-1">
                    Téléphone
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telephone"
                    placeholder="+33 6 12 34 56 78"
                    required
                    className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Adresse complète
                  </Label>
                  <Textarea
                    id="adresse"
                    placeholder="Numéro, rue, code postal, ville"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professionnelles" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <span>Carrière</span>
                </CardTitle>
                <CardDescription>
                  Situation professionnelle actuelle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="poste">Poste actuel</Label>
                  <Input
                    id="poste"
                    placeholder="Poste occupé"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entreprise">Entreprise</Label>
                  <Input
                    id="entreprise"
                    placeholder="Nom de l'entreprise"
                    className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="secteur">Secteur d'activité</Label>
                    <Select>
                      <SelectTrigger 
                        id="secteur"
                        className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                      >
                        <SelectValue placeholder="Sélectionner un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informatique">Informatique</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="sante">Santé</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Années d'expérience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      placeholder="5"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pedagogiques" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="p-1.5 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span>Parcours</span>
                </CardTitle>
                <CardDescription>
                  Formation et compétences pédagogiques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="niveau-etude">Niveau d'étude</Label>
                  <Select>
                    <SelectTrigger 
                      id="niveau-etude"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    >
                      <SelectValue placeholder="Sélectionner un niveau d'étude" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bac">Bac</SelectItem>
                      <SelectItem value="bac+2">Bac+2</SelectItem>
                      <SelectItem value="bac+3">Bac+3</SelectItem>
                      <SelectItem value="bac+5">Bac+5</SelectItem>
                      <SelectItem value="doctorat">Doctorat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formations-anterieures">Formations antérieures</Label>
                  <Select>
                    <SelectTrigger 
                      id="formations-anterieures"
                      className="border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                    >
                      <SelectValue placeholder="Sélectionner des formations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dev-web">Développement Web</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    La sélection multiple sera disponible dans une version future
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competences">Compétences particulières</Label>
                  <Textarea
                    id="competences"
                    placeholder="Listez les compétences spécifiques du participant"
                    className="min-h-[100px] border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-800/50"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/participants")}
                  className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                >
                  Créer le participant
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}