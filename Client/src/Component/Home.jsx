import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();  // Correct hook here
  return (
    <div>
      <h1>Home</h1>
      <button className='p-1.5 bg-amber-300' onClick={() => navigate("/login")}>Login</button>  {/* Wrap navigate with arrow function */}
      <button className='p-1.5 bg-violet-600' onClick={() => navigate("/sign")}>Sign In</button>
    </div>
  )
}

export default Home
