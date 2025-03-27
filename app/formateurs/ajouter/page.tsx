"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, User, Briefcase, CalendarDays, Link2, Star, Award, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { FormateurDisponibilites } from "@/components/formateur-disponibilites"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AjouterFormateurPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [specialisations, setSpecialisations] = useState<string[]>([])
  const [specialisationInput, setSpecialisationInput] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("profil")
  const [completion, setCompletion] = useState(35)

  const handleAddSpecialisation = () => {
    if (specialisationInput.trim() && !specialisations.includes(specialisationInput.trim())) {
      setSpecialisations([...specialisations, specialisationInput.trim()])
      setSpecialisationInput("")
      setCompletion(Math.min(completion + 5, 95))
    }
  }

  const handleRemoveSpecialisation = (specialisation: string) => {
    setSpecialisations(specialisations.filter((s) => s !== specialisation))
    setCompletion(Math.max(completion - 5, 35))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        setCompletion(prev => Math.min(prev + 10, 95))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCompletion(tab === "profil" ? 35 : 70)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  toast({
  title: "Formateur ajouté avec succès",
  description: (
    <div className="flex items-center gap-2">
      <Star className="h-5 w-5 text-amber-500 fill-amber-100" />
      <span>Le nouveau formateur est maintenant disponible dans votre catalogue</span>
    </div>
  ),
})
    router.push("/formateurs")
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 bg-gradient-to-br from-gray-50/50 to-indigo-50/20 dark:from-gray-900 dark:to-gray-800">
      {/* Header avec barre de progression */}
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Nouveau Formateur
            </span>
          </h1>
          <p className="text-muted-foreground">
            Complétez les informations pour intégrer un nouveau formateur à votre équipe
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Progression {completion}%
            </span>
            {completion > 80 && (
              <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-full">
                <Zap className="h-3 w-3" />
                Presque terminé !
              </span>
            )}
          </div>
          <Progress value={completion} className="h-2 [&>div]:bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>
      </div>

      <Tabs 
        defaultValue="profil" 
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl">
          <TabsTrigger 
            value="profil" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-indigo-400 rounded-lg"
          >
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger 
            value="disponibilites" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-indigo-400 rounded-lg"
          >
            <CalendarDays className="h-4 w-4" />
            Disponibilités
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="profil" className="space-y-6">
            {/* Photo de profil */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 border-2 border-primary/20">
                    <AvatarImage src={previewImage || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="cursor-pointer">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
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
                    <p className="text-sm text-muted-foreground">
                      JPEG, PNG ou GIF (max. 5MB)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations personnelles */}
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <div className="p-1.5 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/20">
                    <User className="h-5 w-5" />
                  </div>
                  <span>Informations Personnelles</span>
                </CardTitle>
                <CardDescription>
                  Ces informations seront visibles dans le profil public du formateur
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { id: "nom", label: "Nom", placeholder: "Nom du formateur", required: true },
                  { id: "prenom", label: "Prénom", placeholder: "Prénom du formateur", required: true },
                  { id: "email", label: "Email", placeholder: "email@exemple.com", type: "email", required: true },
                  { id: "telephone", label: "Téléphone", placeholder: "+33 6 12 34 56 78", required: true }
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                    />
                  </div>
                ))}

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    placeholder="Décrivez le parcours, les compétences et les réalisations marquantes du formateur..."
                    className="min-h-[120px] border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                  />
                  <p className="text-sm text-muted-foreground">
                    Entre 100 et 300 caractères recommandés
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Profil professionnel */}
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <div className="p-1.5 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/20">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <span>Profil Professionnel</span>
                </CardTitle>
                <CardDescription>
                  Ces informations aident à mieux cibler les missions pour ce formateur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-1">
                    Spécialisations
                    <span className="text-red-500">*</span>
                    <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      {specialisations.length} ajoutées
                    </Badge>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {specialisations.map((specialisation) => (
                      <Badge
                        key={specialisation}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 hover:bg-indigo-200/70 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/40"
                      >
                        {specialisation}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecialisation(specialisation)}
                          className="rounded-full p-0.5 hover:bg-indigo-300/30 dark:hover:bg-indigo-700/30"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ex: React, Management, UX Design..."
                      value={specialisationInput}
                      onChange={(e) => setSpecialisationInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSpecialisation()
                        }
                      }}
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSpecialisation}
                      disabled={!specialisationInput.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="flex items-center gap-1">
                      Années d'expérience
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      placeholder="5"
                      required
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tarif">Tarif journalier (€)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                      <Input
                        id="tarif"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="500"
                        className="pl-8 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cv">Curriculum Vitae</Label>
                    <div className="flex items-center gap-2">
                      <Input id="cv" type="file" accept=".pdf" className="hidden" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("cv")?.click()}
                        className="w-full gap-2 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        <Upload className="h-4 w-4" />
                        Téléverser un CV
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Format PDF recommandé (max. 5MB)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">
                      <span className="flex items-center gap-1">
                        <Link2 className="h-4 w-4" />
                        Profil LinkedIn
                      </span>
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-800/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/formateurs")}
                className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                Enregistrer le formateur
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="disponibilites" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <div className="p-1.5 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/20">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <span>Disponibilités</span>
                </CardTitle>
                <CardDescription>
                  Planifiez les créneaux disponibles et les périodes d'indisponibilité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormateurDisponibilites />
              </CardContent>
              <CardFooter className="flex justify-end gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push("/formateurs")}
                  className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                >
                  Finaliser l'inscription
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}