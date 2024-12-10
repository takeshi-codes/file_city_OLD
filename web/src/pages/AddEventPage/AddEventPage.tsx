// import { Link, routes } from '@redwoodjs/router'
import {
  CreateEventMutation,
  CreateEventMutationVariables,
} from 'types/graphql'

import {
  Form,
  Label,
  TextField,
  DateField,
  SelectField,
  Submit,
  SubmitHandler,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const CREATE_EVENT = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`

interface FormValues {
  eventName: string
  eventDate: string
  eventDeck: string
  eventType: string
  placement: string
}

const AddEventPage = () => {
  const { currentUser } = useAuth()
  const [create] = useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CREATE_EVENT)

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const input = {
      ...data,
      userId: currentUser?.id, // Automatically add user ID
    }
    create({ variables: { input: input } })
  }
  return (
    <>
      <Metadata title="AddEvent" description="AddEvent page" />

      <h1>New Event</h1>
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
        <div className="flex flex-col">
          <Label name="eventName" errorClassName="error">
            Name
          </Label>
          <TextField
            name="eventName"
            className="input input-bordered w-full max-w-xs"
            validation={{ required: true }}
          />
        </div>
        <div className="flex flex-col">
          <Label name="eventDate" errorClassName="error">
            Date
          </Label>
          <DateField
            name="eventDate"
            className="input input-bordered w-full max-w-xs"
            validation={{ required: true }}
          />
        </div>
        <div className="flex flex-col">
          <Label name="eventDeck" errorClassName="error">
            Deck
          </Label>
          <TextField
            name="eventDeck"
            className="input input-bordered w-full max-w-xs"
            validation={{ required: true }}
          />
        </div>
        <div className="flex flex-col">
          <Label name="eventType" errorClassName="error">
            Type
          </Label>
          <SelectField
            name="eventType"
            className="input input-bordered w-full max-w-xs"
            validation={{ required: true }}
          >
            <option value={'locals'}>Locals</option>
            <option value={'storeRegional'}>Store Regional</option>
            <option value={'onlineRegional'}>Online Regional</option>
            <option value={'offlineRegional'}>Offline Regional</option>
            <option value={'storeUltimateCup'}>Store Ultimate Cup</option>
            <option value={'onlineUltimateCup'}>Online Ultimate Cup</option>
            <option value={'offlineUltimateCup'}>Offline Ultimate Cup</option>
            <option value={'nationals'}>Nationals</option>
            <option value={'worlds'}>Worlds</option>
          </SelectField>
        </div>
        <div className="flex flex-col">
          <Label name="placement" errorClassName="error">
            Placement
          </Label>
          <SelectField
            name="placement"
            className="input input-bordered w-full max-w-xs"
            validation={{ required: true }}
          >
            <option value={'first'}>First</option>
            <option value={'second'}>Second</option>
            <option value={'top4'}>Top 4</option>
            <option value={'top8'}>Top 8</option>
            <option value={'top16'}>Top 16</option>
            <option value={'top32'}>Top 32</option>
            <option value={'top64'}>Top 64</option>
            <option value={'top128'}>Top 128</option>
            <option value={'top256'}>Top 256</option>
            <option value={'top512'}>Top 512</option>
          </SelectField>
        </div>
        <Submit className="btn btn-primary mt-4">Save</Submit>
      </Form>
      {/*
          My default route is named `addEvent`, link to me with:
          `<Link to={routes.addEvent()}>AddEvent</Link>`
      */}
    </>
  )
}

export default AddEventPage
