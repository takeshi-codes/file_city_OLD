import type { FindRoundsByEvent } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { formatEnum, truncate } from 'src/lib/formatters'

const RoundsList = ({ roundsByEvent }: FindRoundsByEvent) => {
  const onRowClick = (id: string) => {
    navigate(routes.round({ id: id }))
  }

  return (
    <>
      <div className="rw-segment rw-table-wrapper-responsive m-auto max-w-80">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Round</th>
              <th>Opponent Deck</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {roundsByEvent.map((roundByEvent) => (
              <tr
                key={roundByEvent.id}
                onClick={() => onRowClick(roundByEvent.id)}
                className="cursor-pointer"
              >
                <td>{truncate(roundByEvent.roundNumber)}</td>
                <td>{truncate(roundByEvent.opponentDeck)}</td>
                <td>{formatEnum(roundByEvent.result)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RoundsList
