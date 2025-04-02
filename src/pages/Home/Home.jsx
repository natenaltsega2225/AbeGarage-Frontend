import React from 'react'
import Banner from '../../components/General/Banner/Banner'
import banner_1 from"../../assets/banner_1.png"
import banner_2 from "../../assets/banner_4.jpeg"
import Exprience from '../../components/General/exprience/exprience';
import Service from '../../components/General/Our_service/Service';
import Quality from '../../components/General/Quality/Quality';
import Information from '../../components/General/Information/Information';
import Schedule from '../../components/General/Schedule/Schedule';

function Home() { 
    const header_1 = "Tuneup Your Car to Next Level";
    const header_2 = "We are leader in Car Mechanical Work";

  return (
    <div>
        <Banner  banner={banner_1} header={header_1}/>
        <Exprience />
        <Service />
        <Quality />
        <Information />
        <Banner banner={banner_2} header={header_2}/>
        <Schedule />
    </div>
  )
}

export default Home