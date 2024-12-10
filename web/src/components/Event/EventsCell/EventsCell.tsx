import type { FindEvents, FindEventsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Events from 'src/components/Event/Events'

export const QUERY: TypedDocumentNode<FindEvents, FindEventsVariables> = gql`
  query FindEvents {
    events {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No events yet.{' '}
      <Link to={routes.newEvent()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindEvents>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  events,
}: CellSuccessProps<FindEvents, FindEventsVariables>) => {
  return <Events events={events} />
}
