import React from "react"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"


const Layout: React.FC = () => {
  return (
    <div>
    <nav>
      <Link to="/chat">Chat</Link> | <Link to="/profile">Profile</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
  )
}

export default Layout