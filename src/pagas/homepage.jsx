import React, { useState } from 'react'
import Nav from '../components/nav'
import Ratelimit from '../components/ratelimit.jsx';
const Homepage = () => {
  const [isratelimited, setisratelimited] = useState(true);
  return (
    <>
    <div>
    <Nav />
    <div>
  {isratelimited && <Ratelimit/>}
  </div>  
   </div>
    </>
  )
}

export default Homepage