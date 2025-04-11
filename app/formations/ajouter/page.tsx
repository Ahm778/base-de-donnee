"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CalendarIcon, Clock, MapPin, Monitor, Users, CreditCard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import courseService from "@/api/courseService";

interface CourseFormData {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  category?: string;
  type?: string;
  level?: string;
  durationHours?: number;
  address?: string;
  room?: string;
  capacity?: number;
  onlineLink?: string;
  connectionInstructions?: string;
  cost?: number;
  fullPayment?: boolean;
  installmentPayment?: boolean;
  fundingAvailable?: boolean;
  formateurPrincipal?: string;
  formateursAssistants?: string[];
  heureDebut?: string;
  heureFin?: string;
}

export default function AjouterFormationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [dateDebut, setDateDebut] = useState<Date>();
  const [dateFin, setDateFin] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    defaultValues: {
      type: "presentiel",
      category: "developpement",
      level: "debutant",
      heureDebut: "09:00",
      heureFin: "17:00",
      fullPayment: false,
      installmentPayment: false,
      fundingAvailable: false,
    },
  });

  const formationType = watch("type");

  useEffect(() => {
    if (dateDebut) setValue("startDate", dateDebut.toISOString());
  }, [dateDebut, setValue]);

  useEffect(() => {
    if (dateFin) setValue("endDate", dateFin.toISOString());
  }, [dateFin, setValue]);

  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    
    try {
      if (!dateDebut || !dateFin) {
        throw new Error("Les dates de début et fin sont obligatoires");
      }

      const createdCourse = await courseService.createCourse({
        ...data,
        startDate: dateDebut.toISOString(),
        endDate: dateFin.toISOString(),
      });
      
      toast({
        title: "Formation créée",
        description: "La formation a été créée avec succès",
        variant: "default",
      });
      
      router.push(`/formations/${createdCourse.id}`);
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la création",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 relative">
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
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="lieu">Lieu</TabsTrigger>
          <TabsTrigger value="formateur">Formateur</TabsTrigger>
          <TabsTrigger value="tarification">Tarification</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("title", { required: "Le titre est obligatoire" })}
                    placeholder="Titre de la formation"
                    className="focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
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
                    <Select
                      {...register("category")}
                      onValueChange={(value) => setValue("category", value)}
                    >
                      <SelectTrigger id="categorie" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developpement">Développement</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      {...register("type")}
                      onValueChange={(value) => setValue("type", value)}
                    >
                      <SelectTrigger id="type" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="presentiel">Présentiel</SelectItem>
                        <SelectItem value="enligne">En ligne</SelectItem>
                        <SelectItem value="hybride">Hybride</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="niveau">Niveau</Label>
                    <Select
                      {...register("level")}
                      onValueChange={(value) => setValue("level", value)}
                    >
                      <SelectTrigger id="niveau" className="focus:ring-2 focus:ring-blue-500/20">
                        <SelectValue placeholder="Sélectionner un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">Débutant</SelectItem>
                        <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                        <SelectItem value="avance">Avancé</SelectItem>
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
                      {...register("durationHours", {
                        required: "La durée est obligatoire",
                        valueAsNumber: true,
                      })}
                      placeholder="24"
                      className="focus:ring-2 focus:ring-blue-500/20"
                    />
                    {errors.durationHours && <p className="text-sm text-red-500">{errors.durationHours.message}</p>}
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
                        {...register("heureDebut")}
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                      <Input
                        type="time"
                        {...register("heureFin")}
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
                        {...register("address")}
                        placeholder="Adresse du lieu de formation"
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="salle">Salle</Label>
                        <Input
                          id="salle"
                          {...register("room")}
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
                          {...register("capacity", { valueAsNumber: true })}
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
                        {...register("onlineLink")}
                        placeholder="https://..."
                        className="focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions de connexion</Label>
                      <Textarea
                        id="instructions"
                        {...register("connectionInstructions")}
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
                  <Select
                    {...register("formateurPrincipal")}
                    onValueChange={(value) => setValue("formateurPrincipal", value)}
                  >
                    <SelectTrigger id="formateur-principal" className="focus:ring-2 focus:ring-blue-500/20">
                      <SelectValue placeholder="Sélectionner un formateur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jean-dupont">Jean Dupont</SelectItem>
                      <SelectItem value="marie-martin">Marie Martin</SelectItem>
                      <SelectItem value="pierre-leroy">Pierre Leroy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formateurs-assistants">Formateurs assistants</Label>
                  <Select
                    {...register("formateursAssistants")}
                    onValueChange={(value) => setValue("formateursAssistants", [value])}
                  >
                    <SelectTrigger id="formateurs-assistants" className="focus:ring-2 focus:ring-blue-500/20">
                      <SelectValue placeholder="Sélectionner des formateurs assistants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sophie-bernard">Sophie Bernard</SelectItem>
                      <SelectItem value="thomas-petit">Thomas Petit</SelectItem>
                      <SelectItem value="julie-moreau">Julie Moreau</SelectItem>
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
                      {...register("cost", { valueAsNumber: true })}
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
                      <Checkbox
                        id="paiement-complet"
                        {...register("fullPayment")}
                        onCheckedChange={(checked) => setValue("fullPayment", Boolean(checked))}
                      />
                      <Label htmlFor="paiement-complet" className="text-sm font-normal leading-none">
                        Paiement complet
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="paiement-echelonne"
                        {...register("installmentPayment")}
                        onCheckedChange={(checked) => setValue("installmentPayment", Boolean(checked))}
                      />
                      <Label htmlFor="paiement-echelonne" className="text-sm font-normal leading-none">
                        Paiement échelonné
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prise-en-charge"
                        {...register("fundingAvailable")}
                        onCheckedChange={(checked) => setValue("fundingAvailable", Boolean(checked))}
                      />
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
                  type="button"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md hover:shadow-lg transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Création en cours..." : "Créer la formation"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}