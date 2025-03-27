import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground text-sm">
          Bienvenue sur votre tableau de bord de gestion de formation
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          <Calendar className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="font-medium">Sélectionner une date</span>
        </Button>
        
        <Button 
          size="sm" 
          className="h-10 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="font-medium">Exporter</span>
        </Button>
      </div>
    </div>
  );
}