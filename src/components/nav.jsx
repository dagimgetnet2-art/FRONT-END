import React from 'react'

const Nav = () => {
  return (
    <>
    <div className="navbar bg-cyan-500 shadow-sm">
  <div className="navbar-start">
    <div className=" normal-case text-xl">by Dagim</div>
  </div>
  <div className="navbar-center">
    <div className=" normal-case text-xl">Notes App</div>
  </div>  
  <div className="navbar-end">
    <a className="btn">add new note</a>
  </div>
</div>
    </>
  )
}

export default Nav