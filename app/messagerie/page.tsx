"use client"

import { useState } from "react"
import { Send, Search, PaperclipIcon, MoreVertical, Smile } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function MessageriePage() {
  const [selectedContact, setSelectedContact] = useState<number | null>(1)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const contacts = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Formateur",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JD",
      lastMessage: "Bonjour, avez-vous reçu les documents pour la formation ?",
      lastMessageTime: "10:30",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Sophie Martin",
      role: "Participant",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
      lastMessage: "Merci pour les informations !",
      lastMessageTime: "Hier",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Pierre Leroy",
      role: "Formateur",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PL",
      lastMessage: "Je vous envoie le planning de la semaine prochaine.",
      lastMessageTime: "Hier",
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: "Thomas Bernard",
      role: "Participant",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TB",
      lastMessage: "Est-ce que je peux avoir plus d'informations sur la formation Angular ?",
      lastMessageTime: "Lun",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Julie Petit",
      role: "Participant",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
      lastMessage: "Je ne pourrai pas assister à la session de demain.",
      lastMessageTime: "Dim",
      unread: 0,
      online: false,
    },
  ]

  const messages = [
    {
      id: 1,
      contactId: 1,
      sender: "Jean Dupont",
      content: "Bonjour, avez-vous reçu les documents pour la formation ?",
      timestamp: "10:30",
      isMe: false,
    },
    {
      id: 2,
      contactId: 1,
      sender: "Moi",
      content: "Bonjour Jean, oui j'ai bien reçu les documents. Merci !",
      timestamp: "10:35",
      isMe: true,
    },
    {
      id: 3,
      contactId: 1,
      sender: "Jean Dupont",
      content: "Parfait ! Avez-vous des questions sur le contenu ?",
      timestamp: "10:40",
      isMe: false,
    },
    {
      id: 4,
      contactId: 1,
      sender: "Jean Dupont",
      content: "N'hésitez pas à me contacter si vous avez besoin de plus d'informations.",
      timestamp: "10:41",
      isMe: false,
    },
  ]

  const filteredContacts = contacts.filter((contact) => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedContactMessages = messages.filter((message) => message.contactId === selectedContact)

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      // Dans une application réelle, vous enverriez le message à l'API
      console.log(`Message envoyé à ${selectedContact}: ${message}`)
      setMessage("")
    }
  }

  return (
    <div className="flex-1 flex h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar des contacts */}
      <div className="w-80 border-r bg-white dark:bg-gray-800 flex flex-col shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {filteredContacts.map((contact) => (
            <div key={contact.id}>
              <button
                className={`w-full p-3 text-left flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  selectedContact === contact.id ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {contact.initials}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs h-5">
                      {contact.role}
                    </Badge>
                    {contact.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
              </button>
              <Separator className="last:hidden" />
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {selectedContact ? (
          <>
            <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={contacts.find((c) => c.id === selectedContact)?.avatar}
                    alt={contacts.find((c) => c.id === selectedContact)?.name}
                  />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {contacts.find((c) => c.id === selectedContact)?.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {contacts.find((c) => c.id === selectedContact)?.name}
                    {contacts.find((c) => c.id === selectedContact)?.online && (
                      <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contacts.find((c) => c.id === selectedContact)?.role}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuItem>Archiver</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Supprimer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <ScrollArea className="flex-1 p-6 bg-gray-50 dark:bg-gray-900/50">
              <div className="space-y-4">
                {selectedContactMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl p-4 relative ${
                        message.isMe 
                          ? "bg-blue-500 text-white rounded-br-none" 
                          : "bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-bl-none"
                      }`}
                    >
                      {!message.isMe && (
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {message.sender}
                        </div>
                      )}
                      <p className={message.isMe ? "text-white" : "text-gray-800 dark:text-gray-200"}>
                        {message.content}
                      </p>
                      <div
                        className={`text-xs mt-2 text-right ${
                          message.isMe ? "text-blue-100" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-white dark:bg-gray-800">
              <div className="flex gap-3 items-end">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" type="button">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" type="button">
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                <Textarea
                  placeholder="Écrivez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[60px] flex-1 resize-none bg-gray-50 dark:bg-gray-700 border-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage} 
                  disabled={!message.trim()}
                  className="h-10 w-10 bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
            <div className="max-w-md">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
                Sélectionnez une conversation
              </h3>
              <p className="text-sm">
                Choisissez une conversation existante ou démarrez une nouvelle discussion pour commencer à échanger.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}