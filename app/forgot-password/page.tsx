"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Mail, ArrowLeft, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
    toast({
      title: "Email envoyé",
      description: "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.",
    })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-indigo-100 opacity-20 blur-3xl animate-float-slow"></div>
        <div className="absolute right-10 bottom-20 h-64 w-64 rounded-full bg-purple-100 opacity-20 blur-3xl animate-float-slow animation-delay-2000"></div>
      </div>
      
      <div className="relative w-full max-w-md transition-all duration-300 ease-in-out hover:scale-[1.01]">
        <Card className="relative overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Mot de passe oublié
            </CardTitle>
            <CardDescription className="text-gray-600">
              {!isSubmitted
                ? "Entrez votre adresse email pour réinitialiser votre mot de passe"
                : "Vérifiez votre boîte de réception"}
            </CardDescription>
          </CardHeader>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@exemple.com"
                      className="pl-10 h-11 text-gray-700 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 group"
             disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <span className="transform transition-transform group-hover:scale-105">
                      Envoyer le lien de réinitialisation
                    </span>
                  )}
                </Button>
                <div className="text-center text-sm">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Retour à la connexion
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6 animate-fade-in">
              <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-100 transform transition-transform hover:scale-[1.02]">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Email envoyé avec succès!
                    </h3>
                    <p className="mt-1 text-sm text-green-700">
                      Un email a été envoyé à <span className="font-semibold">{email}</span> avec les instructions pour réinitialiser votre mot de passe.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier de spam ou{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                >
                  essayez à nouveau
                </button>.
              </p>
              
              <div className="text-center pt-2">
                <Button 
                  variant="outline" 
                  asChild 
                  className="mt-2 h-11 border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                >
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                  </Link>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
        
        {/* Footer note */}
        <p className="mt-6 text-center text-sm text-gray-500 opacity-0 animate-fade-in-delayed">
          Besoin d'aide?{' '}
          <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-colors duration-200">
            Contactez notre support
          </Link>
        </p>
      </div>

      {/* Add these to your global CSS */}
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 0.5s ease-out 0.3s forwards;
        }
      `}</style>
    </div>
  )
}