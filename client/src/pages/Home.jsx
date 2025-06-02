import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {
  React.useEffect(() => {
    document.title = "Finance Tracker - Home"
  }, [])
  return (
    <>
        <Navbar />
        <Hero />
    </>
  )
}

export default Home