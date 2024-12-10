import type {
  FindRoundsByEvent,
  FindRoundsByEventVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Rounds from 'src/components/Round/Rounds'

export const QUERY: TypedDocumentNode<
  FindRoundsByEvent,
  FindRoundsByEventVariables
> = gql`
  query FindRoundsByEvent($eventId: String!) {
    roundsByEvent(eventId: $eventId) {
      id
      roundNumber
      opponentDeck
      result
      eventId
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
  return <div className="rw-text-center">No rounds yet. </div>
}

export const Failure = ({ error }: CellFailureProps<FindRoundsByEvent>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  roundsByEvent,
}: CellSuccessProps<FindRoundsByEvent, FindRoundsByEventVariables>) => {
  return <Rounds roundsByEvent={roundsByEvent} />
}
