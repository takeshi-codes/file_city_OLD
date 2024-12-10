import EventCell from 'src/components/Event/EventCell'
import RoundsCell from 'src/components/Round/RoundsCell'

type EventPageProps = {
  id: string
}

const EventPage = ({ id }: EventPageProps) => {
  return (
    <>
      <EventCell id={id} />
      <RoundsCell eventId={id} />
    </>
  )
}

export default EventPage
