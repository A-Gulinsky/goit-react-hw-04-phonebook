import { useState } from "react"
import shortid from "shortid"

import Container from "./App/App.styled"
import Section from "./Section"

import Phonebook from "./Phonebook"
import Contacts from "./Contacts"
import Filter from "./Filter"

// Custom Hooks
import useLocalStorageHook from "hooks/UseLocalStorageHook"

const App = () => {
  const [contacts, setContacts] = useLocalStorageHook('contacts', [])
  const [filter, setFilter] = useState('')

  const addNewContact = (data) => {

    const {name,number} = data

      const newContact = {
        id: shortid.generate(),
        name,
        number
      }

      if (contacts.some(contact => name === contact.name)) {
        return alert(`${name} is already in contacts`)
      }

    setContacts(prev => [newContact, ...prev])
  }

  const deleteContact = id => setContacts(contacts.filter(contact => contact.id !== id))

  const filterContacts = e => setFilter(e.currentTarget.value)

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase()

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }

  return (
    
    <Container>
      <Section title="Phonebook">
        <Phonebook onSubmitForm={addNewContact}></Phonebook>
      </Section>
      <Section title="Contacts">
        <Filter onChange={filterContacts}></Filter>
        <Contacts contacts={getFilteredContacts()} onDeleteContact={deleteContact}></Contacts>
      </Section>
    </Container> 
  )
}

export default App