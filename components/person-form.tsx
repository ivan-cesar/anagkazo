"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

interface PersonFormProps {
  onSubmit: (data: {
    nom: string
    prenoms: string
    numero: string
    quartier: string
    evangeliste: string
    priere_spontanee: boolean
    priere_du_salut: boolean
    guerison: boolean
    invitation_eglise: boolean
  }) => void
}

export function PersonForm({ onSubmit }: PersonFormProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    onSubmit({ 
      nom, 
      prenoms, 
      numero: numero || "",
      quartier,
      evangeliste,
      priere_spontanee,
      priere_du_salut,
      guerison,
      invitation_eglise
    })

    setNom("")
    setPrenoms("")
    setNumero(undefined)
    setQuartier("")
    setEvangeliste("")
    setPriereSpontanee(false)
    setPriereDuSalut(false)
    setGuerison(false)
    setInvitationEglise(false)
    setIsSubmitting(false)
  }

  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <UserPlus className="h-4 w-4 text-primary" />
          </div>
          Enregistrer un participant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="numero" className="text-foreground">Numéro de téléphone</Label>
              <PhoneInput
                id="numero"
                placeholder="+225 00 00 00 00 00"
                value={numero}
                onChange={setNumero}
                defaultCountry="CI"
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
            <div className="grid gap-3 sm:grid-cols-2">
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
            className="w-full sm:w-auto !bg-[#e85d04] hover:!bg-[#d14f00] !text-white font-semibold shadow-lg shadow-orange-500/30"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
