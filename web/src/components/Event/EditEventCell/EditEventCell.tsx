import type {
  EditEventById,
  UpdateEventInput,
  UpdateEventMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EventForm from 'src/components/Event/EventForm'

export const QUERY: TypedDocumentNode<EditEventById> = gql`
  query EditEventById($id: String!) {
    event: event(id: $id) {
      id
      eventDate
      eventDeck
      eventName
      eventType
      placement
      userId
    }
  }
`

const UPDATE_EVENT_MUTATION: TypedDocumentNode<
  EditEventById,
  UpdateEventMutationVariables
> = gql`
  mutation UpdateEventMutation($id: String!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      eventDate
      eventDeck
      eventName
      eventType
      placement
      userId
    }
  }
`

export const Loading = () => <div><span className="loading loading-dots loading-lg"></span></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ event }: CellSuccessProps<EditEventById>) => {
  const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event updated')
      navigate(routes.dashboard())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateEventInput,
    id: EditEventById['event']['id']
  ) => {
    updateEvent({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Editing Event {event?.eventName}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EventForm
          event={event}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
