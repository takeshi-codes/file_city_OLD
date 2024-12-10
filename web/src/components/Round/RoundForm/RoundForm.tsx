import { useState, useEffect } from 'react'

import type { EditRoundById, UpdateRoundInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

type FormRound = NonNullable<EditRoundById['round']>

interface RoundFormProps {
  round?: EditRoundById['round']
  onSave: (data: UpdateRoundInput, id?: FormRound['id']) => void
  error: RWGqlError
  loading: boolean
}

const GET_LAST_ROUND = gql`
  query GetLastRound($eventId: String!) {
    roundsByEvent(eventId: $eventId) {
      roundNumber
    }
  }
`

const RoundForm = (props: RoundFormProps) => {
  const { currentUser } = useAuth()
  const { id } = useParams()
  const [roundNumber, setRoundNumber] = useState<number | null>(null)

  const { data } = useQuery(GET_LAST_ROUND, {
    variables: { eventId: id },
  })

  useEffect(() => {
    if (data && data.roundsByEvent.length > 0) {
      // Get the last round number and increment it
      const lastRound = data.roundsByEvent.reduce(
        (max: { roundNumber: number }, round: { roundNumber: number }) =>
          round.roundNumber > max.roundNumber ? round : max,
        { roundNumber: 0 }
      )
      setRoundNumber(lastRound.roundNumber + 1)
    } else {
      setRoundNumber(1) // If no rounds exist, start with 1
    }
  }, [data])

  const onSubmit = (data: FormRound) => {
    const roundData = {
      ...data,
      roundNumber: roundNumber,
      eventId: id,
      userId: currentUser?.id, // Add the userId from the current user
    }
    props.onSave(roundData, props?.round?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormRound> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="roundNumber"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Round Number: {roundNumber || props.round?.roundNumber || ''}
        </Label>

        <Label
          name="opponentDeck"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Opponent deck
        </Label>

        <TextField
          name="opponentDeck"
          defaultValue={props.round?.opponentDeck}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="opponentDeck" className="rw-field-error" />

        <div className="rw-select-dropdown">
          <Label
            name="result"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Round Result
          </Label>
          <SelectField
            name="result"
            defaultValue={props.round?.result || 'WW'} // Default value
            className="rw-input"
            validation={{ required: true }} // Ensure that result is required
          >
            <option value="WW">WW</option>
            <option value="LL">LL</option>
            <option value="WLW">WLW</option>
            <option value="WLL">WLL</option>
            <option value="LWW">LWW</option>
            <option value="LWL">LWL</option>
            <option value="TIE">Tie</option>
          </SelectField>
          <FieldError name="result" className="rw-field-error" />
        </div>
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="btn btn-primary">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RoundForm
