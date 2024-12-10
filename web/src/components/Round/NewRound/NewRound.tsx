import type {
  CreateRoundMutation,
  CreateRoundInput,
  CreateRoundMutationVariables,
  FindEventById,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RoundForm from 'src/components/Round/RoundForm'
import { timeTag } from 'src/lib/formatters'

const CREATE_ROUND_MUTATION: TypedDocumentNode<
  CreateRoundMutation,
  CreateRoundMutationVariables
> = gql`
  mutation CreateRoundMutation($input: CreateRoundInput!) {
    createRound(input: $input) {
      id
    }
  }
`

const FIND_EVENT_QUERY = gql`
  query FindEventById($id: String!) {
    event(id: $id) {
      id
      eventName
      eventDate
    }
  }
`

const NewRound = () => {
  const [createRound, { loading, error }] = useMutation(CREATE_ROUND_MUTATION, {
    onCompleted: () => {
      toast.success('Round created')
      navigate(routes.event({ id: eventData.event.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateRoundInput) => {
    createRound({ variables: { input } })
  }

  const { id } = useParams()

  const { data: eventData, loading: eventLoading } = useQuery<FindEventById>(
    FIND_EVENT_QUERY,
    { variables: { id } }
  )

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        {eventLoading ? (
          <div>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            <h2 className="rw-heading rw-heading-secondary">
              Event: {eventData?.event?.eventName}
            </h2>
            <h2 className="rw-heading rw-heading-secondary">
              Date: {timeTag(eventData?.event?.eventDate)}
            </h2>
          </>
        )}
      </header>
      <div className="rw-segment-main">
        <RoundForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRound
