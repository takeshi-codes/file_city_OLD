import { Link } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const LandingPage = () => {
  return (
    <>
      <Metadata title="Landing" description="Landing page" />

      <div className="card m-auto max-w-prose shadow-xl">
        <div className="card-body items-center text-left">
          <h2 className="typewriter card-title max-w-prose text-xl">
            WELCOME TO FILE_CITY
          </h2>
          <p>
            FILE_CITY is designed to help players of the Digimon Card Game
            easily track and manage their match results. With features to log
            match details and analyze performance, it ensures that you never
            lose track of your progress in competitive play.
          </p>

          <p>
            Whether you&apos;re participating in casual games or official
            tournaments, FILE_CITY streamlines your experience, providing a
            clear overview of your matches at a glance.
          </p>
          <div className="card-actions">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
