"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Users, Download } from "lucide-react"
import { PersonForm } from "@/components/person-form"
import { PersonsTable } from "@/components/persons-table"

interface Person {
  id: number
  nom: string
  prenoms: string
  numero: string
  quartier: string
  evangeliste: string
  priere_spontanee: boolean
  priere_du_salut: boolean
  guerison: boolean
  invitation_eglise: boolean
  created_at: string
  updated_at: string
}

const API_BASE_URL = "https://anagkazo-api.dieubatit.com/api"

export default function DashboardPage() {
  const router = useRouter()
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/personnes`)
      if (response.ok) {
        const data = await response.json()
        setPersons(data)
      } else {
        setError("Erreur lors du chargement des participants")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
      console.error("Erreur:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPerson = async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/personnes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        await fetchPersons()
      }
    } catch (err) {
      console.error("Erreur lors de l'ajout:", err)
    }
  }

  const handleDeletePerson = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/personnes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPersons((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err)
    }
  }

  const exportToExcel = () => {
    if (persons.length === 0) {
      alert("Aucune donnée à exporter")
      return
    }

    // Create CSV content
    const headers = [
      'ID',
      'Nom',
      'Prénoms', 
      'Numéro de téléphone',
      'Quartier',
      'Évangéliste',
      'Prière spontanée',
      'Prière du salut',
      'Guérison',
      'Invitation église',
      'Date de création'
    ]

    const csvContent = [
      headers.join(','),
      ...persons.map(person => [
        person.id,
        `"${person.nom}"`,
        `"${person.prenoms}"`,
        `"${person.numero}"`,
        `"${person.quartier}"`,
        `"${person.evangeliste}"`,
        person.priere_spontanee ? 'Oui' : 'Non',
        person.priere_du_salut ? 'Oui' : 'Non',
        person.guerison ? 'Oui' : 'Non',
        person.invitation_eglise ? 'Oui' : 'Non',
        `"${new Date(person.created_at).toLocaleDateString('fr-FR')}"`
      ].join(','))
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `participants_anagkazo_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Anagkazo Mondial</h1>
              <p className="text-xs text-accent">Tableau de bord</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-secondary/20 px-3 py-1.5">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">{persons.length} participants</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportToExcel}
              className="border-border text-foreground hover:bg-muted hover:text-primary"
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="border-border text-foreground hover:bg-muted hover:text-primary"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <PersonForm onSubmit={handleAddPerson} />
          <PersonsTable persons={persons} onDelete={handleDeletePerson} />
        </div>
      </main>
    </div>
  )
}
