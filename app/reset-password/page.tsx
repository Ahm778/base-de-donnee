"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Lock, ArrowLeft, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setError("")
    
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
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast({
      title: "Mot de passe réinitialisé",
      description: "Votre mot de passe a été mis à jour avec succès.",
    })

    router.push("/login")
  }

  const passwordRequirements = [
    { id: 1, text: "Minimum 8 caractères", validator: (p: string) => p.length >= 8 },
    { id: 2, text: "Au moins une majuscule", validator: (p: string) => /[A-Z]/.test(p) },
    { id: 3, text: "Au moins un chiffre", validator: (p: string) => /[0-9]/.test(p) },
    { id: 4, text: "Au moins un caractère spécial", validator: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ]

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>
      </div>
      
      <Card className="relative w-full max-w-md border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Nouveau mot de passe
          </CardTitle>
          <CardDescription className="text-gray-600">
            Créez un mot de passe sécurisé pour votre compte
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-700">Nouveau mot de passe</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10 h-11"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              {/* Password strength meter */}
              <div className="mt-2">
                <div className="flex gap-1 h-1.5 mb-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`flex-1 rounded-full ${
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
                    <li key={req.id} className="flex items-center">
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

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirmer le mot de passe</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10 h-11"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError("")
                  }}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 border border-red-100 animate-fade-in">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
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
                  Réinitialisation...
                </>
              ) : (
                "Confirmer le nouveau mot de passe"
              )}
            </Button>
            
            <div className="text-center text-sm">
              <Link 
                href="/login" 
                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Retour à la connexion xx
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}