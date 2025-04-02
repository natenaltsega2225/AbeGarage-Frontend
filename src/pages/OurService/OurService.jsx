import React from 'react'
import Service from '../../components/General/Our_service/Service'
import Information from '../../components/General/Information/Information'
import Banner from '../../components/General/Banner/Banner'
import banner_2 from "../../assets/banner_4.jpeg"
import Schedule from '../../components/General/Schedule/Schedule'
import Nav from '../../components/General/Nav/Nav'
import banner from '../../assets/Service.jpeg'
import Skill from '../../components/General/Skill/Skill'


function OurService() {
  const header_2 = "We are leader in Car Mechanical Work";

  return (
    <div>
        <Nav header="Service" banner={banner}/>
        {/* <Skill /> */}
        <Service />
        <Information />
        <Banner banner={banner_2} header={header_2}/>
        <Schedule />
    </div>
  )
}

export default OurService