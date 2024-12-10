import type { FindRoundById, FindRoundByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Round from 'src/components/Round/Round'

export const QUERY: TypedDocumentNode<FindRoundById, FindRoundByIdVariables> =
  gql`
    query FindRoundById($id: String!) {
      round: round(id: $id) {
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

export const Empty = () => <div>Round not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRoundByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  round,
}: CellSuccessProps<FindRoundById, FindRoundByIdVariables>) => {
  return <Round round={round} />
}
