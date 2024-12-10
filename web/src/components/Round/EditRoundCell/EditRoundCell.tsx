import type {
  EditRoundById,
  UpdateRoundInput,
  UpdateRoundMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RoundForm from 'src/components/Round/RoundForm'

export const QUERY: TypedDocumentNode<EditRoundById> = gql`
  query EditRoundById($id: String!) {
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

const UPDATE_ROUND_MUTATION: TypedDocumentNode<
  EditRoundById,
  UpdateRoundMutationVariables
> = gql`
  mutation UpdateRoundMutation($id: String!, $input: UpdateRoundInput!) {
    updateRound(id: $id, input: $input) {
      id
      roundNumber
      opponentDeck
      result
      eventId
      userId
    }
  }
`

export const Loading = () => <div><span className="loading loading-dots loading-lg"></span></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ round }: CellSuccessProps<EditRoundById>) => {
  const [updateRound, { loading, error }] = useMutation(UPDATE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round updated')
      navigate(routes.rounds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateRoundInput,
    id: EditRoundById['round']['id']
  ) => {
    updateRound({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Round {round?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RoundForm
          round={round}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
