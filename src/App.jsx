import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

function App() {

  const [page, setPage] = useState('login')

  const handleNavigate = (page) => {
    setPage(page)
  }

  return (
    <>
      {page === 'login' && <Login onNavigate={handleNavigate} />}
      {page === 'register' && <Register onNavigate={handleNavigate} />}
      {page === 'profile' && <Profile onNavigate={handleNavigate} />}
    </>
  )
}

export default App
