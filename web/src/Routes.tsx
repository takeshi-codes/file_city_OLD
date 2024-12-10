// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import SiteLayout from './layouts/SiteLayout/SiteLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={SiteLayout}>
        <Route path="/" page={LandingPage} name="landing" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <PrivateSet unauthenticated="login" wrap={SiteLayout}>
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/events/new" page={EventNewEventPage} name="newEvent" />
        <Route path="/events/{id}/edit" page={EventEditEventPage} name="editEvent" />
        <Route path="/events/{id}/rounds/new" page={RoundNewRoundPage} name="newRound" />
        <Route path="/events/{id}" page={EventEventPage} name="event" />
        <Route path="/events" page={EventEventsPage} name="events" />
        <Route path="/rounds/{id}/edit" page={RoundEditRoundPage} name="editRound" />
        <Route path="/rounds/{id}" page={RoundRoundPage} name="round" />
        <Route path="/rounds" page={RoundRoundsPage} name="rounds" />
      </PrivateSet>
    </Router>
  )
}

export default Routes
