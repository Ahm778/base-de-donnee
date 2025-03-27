"use client"

import { useState } from "react"
import { Search, FolderOpen, File, Download, MoreHorizontal, Plus, FileText, FileArchive, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("liste")

  const documents = [
    {
      id: 1,
      name: "Introduction à React - Support de cours.pdf",
      type: "PDF",
      size: "2.5 MB",
      formation: "Introduction à React",
      uploadedBy: "Jean Dupont",
      uploadedAt: "15/03/2023",
      category: "Support de cours",
      avatar: "/avatars/01.png"
    },
    {
      id: 2,
      name: "Spring Boot - Exercices pratiques.docx",
      type: "DOCX",
      size: "1.8 MB",
      formation: "Spring Boot pour débutants",
      uploadedBy: "Marie Martin",
      uploadedAt: "02/04/2023",
      category: "Exercices",
      avatar: "/avatars/02.png"
    },
    {
      id: 3,
      name: "Angular - Projet final.zip",
      type: "ZIP",
      size: "4.2 MB",
      formation: "Angular Avancé",
      uploadedBy: "Pierre Leroy",
      uploadedAt: "10/04/2023",
      category: "Projet",
      avatar: "/avatars/03.png"
    },
    {
      id: 4,
      name: "UX/UI Design - Ressources.pdf",
      type: "PDF",
      size: "3.1 MB",
      formation: "UX/UI Design Fondamentaux",
      uploadedBy: "Marie Martin",
      uploadedAt: "05/03/2023",
      category: "Ressources",
      avatar: "/avatars/02.png"
    },
    {
      id: 5,
      name: "Gestion de Projet Agile - Présentation.pptx",
      type: "PPTX",
      size: "5.7 MB",
      formation: "Gestion de Projet Agile",
      uploadedBy: "Sophie Bernard",
      uploadedAt: "20/04/2023",
      category: "Présentation",
      avatar: "/avatars/04.png"
    },
  ]

  const filteredDocuments = documents.filter(
    (document) =>
      document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.formation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />
      case 'DOCX': return <FileText className="h-5 w-5 text-blue-500" />
      case 'PPTX': return <FileText className="h-5 w-5 text-orange-500" />
      case 'ZIP': return <FileArchive className="h-5 w-5 text-yellow-500" />
      default: return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Documents
          </h1>
          <p className="text-muted-foreground">Gérez les documents et ressources de formation</p>
        </div>
        <Button className="group transition-all duration-200 hover:shadow-md">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>Ajouter un document</span>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un document, formation ou catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      <Tabs defaultValue="liste" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger 
            value="liste" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
          >
            Liste
          </TabsTrigger>
          <TabsTrigger 
            value="dossiers" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
          >
            Dossiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="liste">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[300px]">Nom</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Ajouté par</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.type)}
                          <div>
                            <p className="font-medium">{document.name}</p>
                            <p className="text-xs text-muted-foreground">{document.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{document.formation}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.category}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{document.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={document.avatar} />
                            <AvatarFallback>{document.uploadedBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{document.uploadedBy}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{document.uploadedAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-gray-200">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="shadow-lg">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                              <Download className="mr-2 h-4 w-4" />
                              <span>Télécharger</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                              <span>Renommer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                              <span>Partager</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 hover:bg-red-50">
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dossiers">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card className="group transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <FolderOpen className="h-12 w-12 text-blue-500 group-hover:text-blue-600 transition-colors" />
                <CardTitle className="text-lg">Supports de cours</CardTitle>
                <p className="text-sm text-muted-foreground">8 documents</p>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <FolderOpen className="h-12 w-12 text-green-500 group-hover:text-green-600 transition-colors" />
                <CardTitle className="text-lg">Exercices</CardTitle>
                <p className="text-sm text-muted-foreground">12 documents</p>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <FolderOpen className="h-12 w-12 text-purple-500 group-hover:text-purple-600 transition-colors" />
                <CardTitle className="text-lg">Projets</CardTitle>
                <p className="text-sm text-muted-foreground">5 documents</p>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <FolderOpen className="h-12 w-12 text-orange-500 group-hover:text-orange-600 transition-colors" />
                <CardTitle className="text-lg">Présentations</CardTitle>
                <p className="text-sm text-muted-foreground">7 documents</p>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-md cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <FolderOpen className="h-12 w-12 text-cyan-500 group-hover:text-cyan-600 transition-colors" />
                <CardTitle className="text-lg">Ressources</CardTitle>
                <p className="text-sm text-muted-foreground">10 documents</p>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-md cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-300 bg-gray-50/50">
              <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                <Plus className="h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <CardTitle className="text-lg text-gray-500 group-hover:text-blue-600 transition-colors">
                  Nouveau dossier
                </CardTitle>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}