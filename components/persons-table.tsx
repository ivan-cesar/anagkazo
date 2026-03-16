"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Users } from "lucide-react"

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

interface PersonsTableProps {
  persons: Person[]
  onDelete: (id: number) => void
}

export function PersonsTable({ persons, onDelete }: PersonsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatPrayers = (person: Person) => {
    const prayers = []
    if (person.priere_spontanee) prayers.push("Prière spontanée")
    if (person.priere_du_salut) prayers.push("Prière du salut")
    if (person.guerison) prayers.push("Guérison")
    if (person.invitation_eglise) prayers.push("Invitation église")
    return prayers.length > 0 ? prayers.join(", ") : "Aucune"
  }

  return (
    <Card className="border-secondary/20 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/20">
            <Users className="h-4 w-4 text-secondary" />
          </div>
          Participants enregistrés
          <span className="ml-auto rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
            {persons.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {persons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-lg font-medium text-foreground">
              Aucun participant enregistré
            </p>
            <p className="text-sm text-muted-foreground">
              Utilisez le formulaire ci-dessus pour enregistrer un participant
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-accent font-semibold">Nom</TableHead>
                  <TableHead className="text-accent font-semibold">Prénoms</TableHead>
                  <TableHead className="text-accent font-semibold">Téléphone</TableHead>
                  <TableHead className="text-accent font-semibold">Quartier</TableHead>
                  <TableHead className="text-accent font-semibold">Évangéliste</TableHead>
                  <TableHead className="text-accent font-semibold">Actions</TableHead>
                  <TableHead className="text-accent font-semibold">Date</TableHead>
                  <TableHead className="w-[80px] text-accent font-semibold">Suppr.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {persons.map((person) => (
                  <TableRow key={person.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{person.nom}</TableCell>
                    <TableCell className="text-foreground">{person.prenoms}</TableCell>
                    <TableCell className="text-foreground">{person.numero}</TableCell>
                    <TableCell className="text-foreground">{person.quartier}</TableCell>
                    <TableCell className="text-foreground">{person.evangeliste}</TableCell>
                    <TableCell className="text-foreground">
                      <div className="max-w-xs truncate" title={formatPrayers(person)}>
                        {formatPrayers(person)}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(person.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(person.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
