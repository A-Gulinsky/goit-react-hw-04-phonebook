import { useForm } from "react-hook-form"
import { Form, P, Input, Button } from "components/Phonebook/Phonebook.styled"

import {  NameOptions, NumberOptions } from "./InputField"

function Phonebook({ onSubmitForm }) {
  
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    defaultValues: {
      name: '',
      number: ''
    }
  })

  const onSubmit = (data) => {
    onSubmitForm(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <Input
        autoComplete="off"
        {...register("name", NameOptions)}
        style={{ borderColor: errors.name ? 'red' : 'initial' }}
        placeholder="Name"
      />
      {errors.name && <P>{errors.name.message}</P>}

      <Input
        autoComplete="off"
        {...register("number", NumberOptions)}
        style={{ borderColor: errors.number ? 'red' : 'initial' }}
        placeholder="Number"
      />
      {errors.number && <P>{errors.number.message}</P>}

      <Button type="submit" value="Add Contact" />
      
    </Form>
  )
}

export default Phonebook