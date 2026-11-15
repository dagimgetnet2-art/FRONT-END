import { Link } from 'react-router'

const Nav = () => {
  return (
    <div className="navbar bg-cyan-500 shadow-sm text-neutral-content">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-white">
          by Dagim
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-white">
          Notes App
        </Link>
      </div>
      <div className="navbar-end">
        <Link to="/create" className="btn btn-neutral text-white">
          add new note
        </Link>
      </div>
    </div>
  )
}

export default Nav
