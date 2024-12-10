import type { FindEvents } from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'

import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

const EventsList = ({ events }: FindEvents) => {
  const onRowClick = (id: string) => {
    navigate(routes.event({ id: id }))
  }

  const sortEventsByDate = (events) => {
    const eventsCopy = [...events] // making a copy bc events props is an immutable array
    return eventsCopy.sort((a, b) => {
      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    })
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table lg:hidden">
        <tbody>
          {sortEventsByDate(events).map((event) => (
            <tr
              key={event.id}
              onClick={() => onRowClick(event.id)}
              className="cursor-pointer"
            >
              <td>
                {truncate(event.eventName)} <br /> {timeTag(event.eventDate)}
              </td>
              <td className="text-center">{event.eventDeck}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="rw-table hidden lg:table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Deck</th>
            <th>Type</th>
            <th>Placement</th>
          </tr>
        </thead>
        <tbody>
          {sortEventsByDate(events).map((event) => (
            <tr
              key={event.id}
              onClick={() => onRowClick(event.id)}
              className="cursor-pointer"
            >
              <td>
                {truncate(event.eventName)} <br /> {timeTag(event.eventDate)}
              </td>
              <td>{truncate(event.eventDeck)}</td>
              <td>{formatEnum(event.eventType)}</td>
              <td>{formatEnum(event.placement)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventsList
