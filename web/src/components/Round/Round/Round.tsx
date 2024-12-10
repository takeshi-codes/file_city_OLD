import type {
  DeleteRoundMutation,
  DeleteRoundMutationVariables,
  FindRoundById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum } from 'src/lib/formatters'

const DELETE_ROUND_MUTATION: TypedDocumentNode<
  DeleteRoundMutation,
  DeleteRoundMutationVariables
> = gql`
  mutation DeleteRoundMutation($id: String!) {
    deleteRound(id: $id) {
      id
    }
  }
`

interface Props {
  round: NonNullable<FindRoundById['round']>
}

const Round = ({ round }: Props) => {
  const [deleteRound] = useMutation(DELETE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round deleted')
      navigate(routes.rounds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRoundMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete round ' + id + '?')) {
      deleteRound({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Round number</th>
              <td>{round.roundNumber}</td>
            </tr>
            <tr>
              <th>Opponent deck</th>
              <td>{round.opponentDeck}</td>
            </tr>
            <tr>
              <th>Result</th>
              <td>{formatEnum(round.result)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group gap-4">
        <Link
          to={routes.editRound({ id: round.id })}
          className="btn btn-primary"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-error"
          onClick={() => onDeleteClick(round.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Round
