import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopProfessionals from '../components/TopProfessionals'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopProfessionals />
      <Banner />
    </div>
  )
}

export default Home