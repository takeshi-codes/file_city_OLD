import type { EditEventById, UpdateEventInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  DateField,
  TextField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'

import { useAuth } from 'src/auth'

const formatDatetime = (value) => {
  if (value) {
    // Extract the date part from the ISO string
    return value.split('T')[0] // Splits at 'T' and keeps the date part (YYYY-MM-DD)
  }
  return ''
}

type FormEvent = NonNullable<EditEventById['event']>

interface EventFormProps {
  event?: EditEventById['event']
  onSave: (data: UpdateEventInput, id?: FormEvent['id']) => void
  error: RWGqlError
  loading: boolean
}

const EventForm = (props: EventFormProps) => {
  const { currentUser } = useAuth()
  const onSubmit = (data: FormEvent) => {
    const eventData = {
      ...data,
      userId: currentUser?.id, // Add the userId from the current user
    }
    props.onSave(eventData, props?.event?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEvent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="eventName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="eventName"
          defaultValue={props.event?.eventName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="eventName" className="rw-field-error" />

        <Label
          name="eventDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DateField
          name="eventDate"
          defaultValue={formatDatetime(props.event?.eventDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="eventDate" className="rw-field-error" />

        <Label
          name="eventDeck"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Deck
        </Label>

        <TextField
          name="eventDeck"
          defaultValue={props.event?.eventDeck}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="eventDeck" className="rw-field-error" />

        <Label
          name="eventType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event type
        </Label>

        <SelectField
          name="eventType"
          defaultValue={props.event?.eventType || 'locals'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        >
          <option value="locals">Locals</option>
          <option value="storeRegional">Store Regional</option>
          <option value="onlineRegional">Online Regional</option>
          <option value="offlineRegional">Offline Regional</option>
          <option value="storeUltimateCup">Store Ultimate Cup</option>
          <option value="onlineUltimateCup">Online Ultimate Cup</option>
          <option value="offlineUltimateCup">Offline Ultimate Cup</option>
          <option value="nationals">Nationals</option>
          <option value="worlds">Worlds</option>
        </SelectField>

        <FieldError name="eventType" className="rw-field-error" />

        <Label
          name="placement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Placement
        </Label>

        <SelectField
          name="placement"
          defaultValue={props.event?.placement || 'first'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        >
          <option value="first">First</option>
          <option value="second">Second</option>
          <option value="top4">Top 4</option>
          <option value="top8">Top 8</option>
          <option value="top16">Top 16</option>
          <option value="top32">Top 32</option>
          <option value="top64">Top 64</option>
          <option value="top128">Top 128</option>
          <option value="top256">Top 256</option>
          <option value="top512">Top 512</option>
        </SelectField>

        <FieldError name="placement" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="btn btn-primary">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EventForm
