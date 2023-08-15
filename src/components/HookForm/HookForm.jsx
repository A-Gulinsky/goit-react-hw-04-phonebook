import { useForm } from "react-hook-form"
import { Form,P,Input,Button } from "components/Phonebook/Phonebook.styled"

export function HookForm({ onSubmitForm }) {
  
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
        {...register("name", {
          required: `Required field`,
          pattern: {
            value: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            message: `Incorrect format`
          },
          maxLength: {
            value: 15,
            message: 'Max 15 length'
          }
        })}
        style={{ borderColor: errors.name ? 'red' : 'initial' }}
      />
      {errors.name && <P>{errors.name.message}</P>}

      
      <Input
        {...register("number", {
          required: 'Required field',
          pattern: {
            value: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
            message: `Wrong format`
          },
          maxLength: {
            value: 15,
            message: 'Max 15 length'
          },
        })}
        style={{ borderColor: errors.number ? 'red' : 'initial' }}
      />
      {errors.number && <P>{errors.number.message}</P>}

      <input type="submit" value="Add Contact" />
    </Form>
  )
}