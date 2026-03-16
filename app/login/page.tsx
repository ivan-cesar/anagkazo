"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, UserPlus, LogIn } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { set } from "date-fns"

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

export default function LoginPage() {
  const [nom, setNom] = useState("")
  const [prenoms, setPrenoms] = useState("")
  const [numero, setNumero] = useState<string | undefined>("")
  const [quartier, setQuartier] = useState("")
  const [evangeliste, setEvangeliste] = useState("")
  const [priere_spontanee, setPriereSpontanee] = useState(false)
  const [priere_du_salut, setPriereDuSalut] = useState(false)
  const [guerison, setGuerison] = useState(false)
  const [invitation_eglise, setInvitationEglise] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [recentPersons, setRecentPersons] = useState<Person[]>([])
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/personnes`)
      if (response.ok) {
        const data = await response.json()
        setRecentPersons(data.slice(-3).reverse())
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des personnes:", err)
    }
  }

  const handleRegisterPerson = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    setError("")

    try {
      const response = await fetch(`${API_BASE_URL}/personnes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nom,
          prenoms,
          numero,
          quartier,
          evangeliste,
          priere_spontanee,
          priere_du_salut,
          guerison,
          invitation_eglise,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setSuccessMessage(`${prenoms} ${nom} a été enregistré(e) avec succès !`)
        setNom("")
        setPrenoms("")
        setNumero(undefined)
        setQuartier("")
        setEvangeliste("")
        setPriereSpontanee(false)
        setPriereDuSalut(false)
        setGuerison(false)
        setInvitationEglise(false)
        
        await fetchPersons()
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Erreur lors de l'enregistrement")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
      console.error("Erreur:", err)
    }
    
    setIsSubmitting(false)

    setTimeout(() => {
      setSuccessMessage("")
      setError("")
    }, 3000)
  }

  const handleLogin = () => {
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
            <Users className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground text-balance">
            Anagkazo Mondial
          </h1>
          <p className="mt-2 text-accent font-semibold">
            Du 21 Mars au 18 Avril
          </p>
          <p className="mt-1 text-muted-foreground">
            Enregistrement des participants
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Card className="border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                  <UserPlus className="h-4 w-4 text-primary" />
                </div>
                Enregistrer une personne
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Ajoutez un nouveau participant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterPerson} className="space-y-4">
                {successMessage && (
                  <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800">
                    {successMessage}
                  </div>
                )}
                {error && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-foreground">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Nom de famille"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenoms" className="text-foreground">Prénoms</Label>
                  <Input
                    id="prenoms"
                    placeholder="Prénoms"
                    value={prenoms}
                    onChange={(e) => setPrenoms(e.target.value)}
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-foreground">Numéro de téléphone</Label>
                  <PhoneInput
                    id="numero"
                    placeholder="+225 00 00 00 00 00"
                    value={numero}
                    onChange={(value) => setNumero(value || "")}
                    defaultCountry="CI"
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quartier" className="text-foreground">Quartier</Label>
                  <Input
                    id="quartier"
                    placeholder="Quartier"
                    value={quartier}
                    onChange={(e) => setQuartier(e.target.value)}
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evangeliste" className="text-foreground">Évangéliste</Label>
                  <Input
                    id="evangeliste"
                    placeholder="Nom de l'évangéliste"
                    value={evangeliste}
                    onChange={(e) => setEvangeliste(e.target.value)}
                    required
                    className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-foreground font-semibold">Prières et actions</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="priere_spontanee"
                        checked={priere_spontanee}
                        onCheckedChange={(checked) => setPriereSpontanee(checked as boolean)}
                      />
                      <Label htmlFor="priere_spontanee" className="text-foreground">Prière spontanée</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="priere_du_salut"
                        checked={priere_du_salut}
                        onCheckedChange={(checked) => setPriereDuSalut(checked as boolean)}
                      />
                      <Label htmlFor="priere_du_salut" className="text-foreground">Prière du salut</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="guerison"
                        checked={guerison}
                        onCheckedChange={(checked) => setGuerison(checked as boolean)}
                      />
                      <Label htmlFor="guerison" className="text-foreground">Guérison</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="invitation_eglise"
                        checked={invitation_eglise}
                        onCheckedChange={(checked) => setInvitationEglise(checked as boolean)}
                      />
                      <Label htmlFor="invitation_eglise" className="text-foreground">Invitation à l'église</Label>
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Luc 14:23</p>
          <p className="mt-1 text-xs">Église Jeunes Prodiges</p>
        </div>
      </div>
    </main>
  )
}
