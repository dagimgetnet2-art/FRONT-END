import React from 'react'
import { Route, Routes } from 'react-router'
import Homepage from './pagas/homepage.jsx'
import Createpage from './pagas/createpage.jsx'
import Notedetails from './pagas/notedetails.jsx' 
export const App = () => {
  return (
    <>
    
    <Routes>  
  <Route path="/" element={<Homepage />} />
  <Route path="/create" element={<Createpage />} />
  <Route path="/note/:id" element={<Notedetails />} />
    </Routes>
    </>
  )
}

