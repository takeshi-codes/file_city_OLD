import type { FindEventById, FindEventByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Event from 'src/components/Event/Event'

export const QUERY: TypedDocumentNode<FindEventById, FindEventByIdVariables> =
  gql`
    query FindEventById($id: String!) {
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

export const Loading = () => (
  <div>
    <span className="loading loading-dots loading-lg"></span>
  </div>
)

export const Empty = () => <div>Event not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEventByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventById, FindEventByIdVariables>) => {
  return <Event event={event} />
}
