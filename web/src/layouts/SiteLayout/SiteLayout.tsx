import { Link } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

type SiteLayoutProps = {
  children?: React.ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <div className="navbar-start">
          {isAuthenticated ? (
            <Link className="btn btn-ghost text-xl" to={'/dashboard'}>
              FILE_CITY
            </Link>
          ) : (
            <Link className="btn btn-ghost text-xl" to={'/'}>
              FILE_CITY
            </Link>
          )}
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <button className="btn btn-outline" type="button" onClick={logOut}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline" to={'/login'}>
              Login
            </Link>
          )}
        </div>
      </div>
      <main className="m-auto mt-8 max-w-[70%]">{children}</main>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
    </>
  )
}

export default SiteLayout
