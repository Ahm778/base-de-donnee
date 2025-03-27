"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Lock, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userType, setUserType] = useState("participant")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "Connexion réussie",
      description: `Bienvenue ${email}, vous êtes connecté en tant que ${userType}`,
    })
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl animate-float-slow"></div>
        <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-indigo-100 opacity-20 blur-3xl animate-float-slow animation-delay-2000"></div>
      </div>
      
      <Card className="relative w-full max-w-md border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Barre colorée en haut */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Formation Manager
          </CardTitle>
          <CardDescription className="text-gray-600">
            Connectez-vous pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="nom@exemple.com" 
                  className="pl-10 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10 h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-gray-700">Type d'utilisateur</Label>
              <RadioGroup 
                defaultValue="participant" 
                onValueChange={setUserType} 
                className="grid grid-cols-3 gap-2"
              >
                <div>
                  <RadioGroupItem value="administrateur" id="administrateur" className="peer sr-only" />
                  <Label 
                    htmlFor="administrateur" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-blue-50 hover:border-blue-200 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer transition-all"
                  >
                    <span className="font-medium">Administrateur</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="formateur" id="formateur" className="peer sr-only" />
                  <Label 
                    htmlFor="formateur" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-blue-50 hover:border-blue-200 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer transition-all"
                  >
                    <span className="font-medium">Formateur</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="participant" id="participant" className="peer sr-only" />
                  <Label 
                    htmlFor="participant" 
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-blue-50 hover:border-blue-200 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500 cursor-pointer transition-all"
                  >
                    <span className="font-medium">Participant</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
            
            <div className="flex justify-between text-sm">
              <Link 
                href="/forgot-password" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Mot de passe oublié?
              </Link>
              <Link 
                href="/register" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Créer un compte
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Styles d'animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}