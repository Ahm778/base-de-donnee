"use client"

import Link from "next/link"
import { PlusCircle, Search, Filter, Download, Users, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ParticipantsList } from "@/components/participants-list"
import { ParticipantsFilters } from "@/components/participants-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ParticipantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Gestion des <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Participants</span>
          </h1>
          <p className="text-muted-foreground">Consultez et gérez l'ensemble des participants aux formations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
            <Download className="h-4 w-4" />
            Exporter
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
          <Button 
            asChild 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/participants/ajouter" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Ajouter un participant
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Users className="h-5 w-5" />, title: "Participants actifs", value: "245", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" },
          { icon: <Users className="h-5 w-5" />, title: "Nouveaux ce mois", value: "32", color: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" },
          { icon: <Users className="h-5 w-5" />, title: "En formation", value: "184", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" },
          { icon: <Users className="h-5 w-5" />, title: "Certifiés", value: "167", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400" }
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, formation..."
                className="w-full pl-9 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <ParticipantsFilters />
              <Button variant="outline" size="icon" className="flex-shrink-0 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="border-0 shadow-lg overflow-hidden bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm">
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Liste des participants</CardTitle>
                <CardDescription>Filtrés selon vos critères de recherche</CardDescription>
              </div>
            </div>
            <Tabs 
              defaultValue="all" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger 
                  value="all" 
                  className="px-3 py-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="px-3 py-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  Actifs
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive" 
                  className="px-3 py-1.5 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-blue-400"
                >
                  Inactifs
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ParticipantsList />
        </CardContent>
      </Card>
    </div>
  )
}