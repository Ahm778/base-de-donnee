"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Lock, Mail, User, Building, Phone, ChevronRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import authService from "@/api/authService"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Local state for form fields
  const [userType, setUserType] = useState("participant")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    
    // Calculate password strength
    let strength = 0
    if (value.length >= 8) strength++
    if (/[A-Z]/.test(value)) strength++
    if (/[0-9]/.test(value)) strength++
    if (/[^A-Za-z0-9]/.test(value)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      })
      return
    }

    try {
      await authService.register({
        email,
        password,
        firstName,
        lastName,
        role: "STUDENT",
      })
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      })
    }
  }

  const passwordRequirements = [
    { id: 1, text: "Minimum 8 caractères", validator: (p: string) => p.length >= 8 },
    { id: 2, text: "Au moins une majuscule", validator: (p: string) => /[A-Z]/.test(p) },
    { id: 3, text: "Au moins un chiffre", validator: (p: string) => /[0-9]/.test(p) },
    { id: 4, text: "Au moins un caractère spécial", validator: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ]

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>
      </div>
      
      <Card className="relative w-full max-w-md mx-auto border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg"></div>
        
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg transition-transform hover:scale-105">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-gray-600">
            Rejoignez notre plateforme de formation professionnelle
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-1 text-gray-700">
                  <User className="h-4 w-4 text-blue-500" />
                  Prénom
                </Label>
                <Input 
                  id="firstName" 
                  placeholder="Prénom" 
                  required 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-1 text-gray-700">
                  <User className="h-4 w-4 text-blue-500" />
                  Nom
                </Label>
                <Input 
                  id="lastName" 
                  placeholder="Nom" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="transition-all focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1 text-gray-700">
                <Mail className="h-4 w-4 text-blue-500" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nom@exemple.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1 text-gray-700">
                <Phone className="h-4 w-4 text-blue-500" />
                Téléphone
              </Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+33 6 12 34 56 78" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="transition-all focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-1 text-gray-700">
                <Building className="h-4 w-4 text-blue-500" />
                Entreprise
              </Label>
              <Input 
                id="company" 
                placeholder="Nom de l'entreprise" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="transition-all focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1 text-gray-700">
                <Lock className="h-4 w-4 text-blue-500" />
                Mot de passe
              </Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                required 
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Password strength meter */}
              <div className="mt-2">
                <div className="flex gap-1 h-1.5 mb-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`flex-1 rounded-full transition-all duration-500 ${
                        passwordStrength >= level 
                          ? level === 4 ? "bg-green-500" 
                            : level >= 2 ? "bg-blue-500" 
                            : "bg-yellow-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                
                <ul className="space-y-1 text-xs text-gray-600">
                  {passwordRequirements.map((req) => (
                    <li key={req.id} className="flex items-center transition-opacity duration-200">
                      {req.validator(password) ? (
                        <Check className="h-3 w-3 text-green-500 mr-2" />
                      ) : (
                        <X className="h-3 w-3 text-gray-400 mr-2" />
                      )}
                      {req.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-1 text-gray-700">
                <Lock className="h-4 w-4 text-blue-500" />
                Confirmer le mot de passe
              </Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="transition-all focus:ring-2 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Type d'utilisateur</Label>
              <RadioGroup 
                defaultValue="participant" 
                onValueChange={setUserType} 
                className="grid grid-cols-2 gap-2"
              >
                <div>
                  <RadioGroupItem value="participant" id="participant" className="peer hidden" />
                  <Label 
                    htmlFor="participant" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer"
                  >
                    <User className="mb-2 h-6 w-6 text-blue-500" />
                    Participant
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="formateur" id="formateur" className="peer hidden" />
                  <Label 
                    htmlFor="formateur" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer"
                  >
                    <BookOpen className="mb-2 h-6 w-6 text-indigo-500" />
                    Formateur
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox id="terms" required className="mt-1 transition-colors" />
              <Label htmlFor="terms" className="text-sm leading-snug">
                J'accepte les{" "}
                <Link href="/terms" className="text-primary hover:underline font-medium transition-colors">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium transition-colors">
                  politique de confidentialité
                </Link>
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                S'inscrire
              </span>
              <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Button>
            
            <div className="text-center text-sm">
              Vous avez déjà un compte?{" "}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:underline inline-flex items-center transition-colors"
              >
                Se connecter
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}