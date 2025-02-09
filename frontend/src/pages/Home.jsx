import React from 'react'
import HeroSec from '../components/HeroSec'
import  LatestSec from '../components/LatestSec'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import Subscribe from '../components/Subscribe'


const Home = () => {
  return (
    <div>
      <HeroSec/>
      <LatestSec/>
      <BestSeller/>
      <Policy/>
      <Subscribe/>
    </div>
  )
}

export default Home
