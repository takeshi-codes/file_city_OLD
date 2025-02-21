// import { Link, routes } from '@redwoodjs/router'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import EventsCell from 'src/components/Event/EventsCell'

const DashboardPage = () => {
  return (
    <>
      <Metadata title="Dashboard" description="Dashboard page" />

      <h1 className="text-2xl">DASHBOARD</h1>
      <EventsCell />
      <div className="mt-4">
        <Link to={routes.newEvent()} className="btn btn-primary">
          Add Event
        </Link>
      </div>
    </>
  )
}

export default DashboardPage
