import type {
  DeleteEventMutation,
  DeleteEventMutationVariables,
  FindEventById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_EVENT_MUTATION: TypedDocumentNode<
  DeleteEventMutation,
  DeleteEventMutationVariables
> = gql`
  mutation DeleteEventMutation($id: String!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

interface Props {
  event: NonNullable<FindEventById['event']>
}

const Event = ({ event }: Props) => {
  const [deleteEvent] = useMutation(DELETE_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('Event deleted')
      navigate(routes.dashboard())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteEventMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete event ' + id + '?')) {
      deleteEvent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            {event.eventName} - {timeTag(event.eventDate)}
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Event deck</th>
              <td>{event.eventDeck}</td>
            </tr>
            <tr>
              <th>Event name</th>
              <td>{event.eventName}</td>
            </tr>
            <tr>
              <th>Event type</th>
              <td>{formatEnum(event.eventType)}</td>
            </tr>
            <tr>
              <th>Placement</th>
              <td>{formatEnum(event.placement)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group flex gap-4">
        <Link
          to={routes.newRound({ id: event.id })}
          className="btn btn-secondary"
        >
          Add Round
        </Link>
        <Link
          to={routes.editEvent({ id: event.id })}
          className="btn btn-primary"
        >
          Edit
        </Link>

        <button
          type="button"
          className="btn btn-error"
          onClick={() => onDeleteClick(event.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Event
