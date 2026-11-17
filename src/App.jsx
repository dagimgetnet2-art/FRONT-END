import { Route, Routes } from 'react-router'
import Homepage from './pagas/homepage.jsx'
import Createpage from './pagas/createpage.jsx'
import Notedetails from './pagas/notedetails.jsx'
import Nav from './components/nav.jsx'

export const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/note/:id" element={<Notedetails />} />
      </Routes>
    </div>
  )
}
