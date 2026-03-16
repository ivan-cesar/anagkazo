export interface Person {
  id: string
  nom: string
  prenoms: string
  numero: string
  quartier: string
  evangeliste: string
  priere_spontanee: boolean
  priere_du_salut: boolean
  guerison: boolean
  invitation_eglise: boolean
  createdAt: string
  userId: string
}

export function getPersons(userId: string): Person[] {
  if (typeof window === "undefined") return []
  const persons = JSON.parse(localStorage.getItem("persons") || "[]")
  return persons.filter((p: Person) => p.userId === userId)
}

export function addPerson(person: Omit<Person, "id" | "createdAt">): Person {
  const persons = JSON.parse(localStorage.getItem("persons") || "[]")
  const newPerson: Person = {
    ...person,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  persons.push(newPerson)
  localStorage.setItem("persons", JSON.stringify(persons))
  return newPerson
}

export function deletePerson(id: string): void {
  const persons = JSON.parse(localStorage.getItem("persons") || "[]")
  const filtered = persons.filter((p: Person) => p.id !== id)
  localStorage.setItem("persons", JSON.stringify(filtered))
}
