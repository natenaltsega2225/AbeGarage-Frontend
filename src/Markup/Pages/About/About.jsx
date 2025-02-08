import React from 'react'
import bg2 from "../../../assets/images/background/bg2.png"
import {Link} from "react-router-dom"
import im8 from "../../../assets/images/background/carry_tire.png"
import About24 from "../../Components/About24/About24"
import WhyChooseUs from '../../Components/WhyChoosUs/WhyChooseUs'
import BottomBanner from '../../Components/Banner/BottomBanner'
import CtaSec from '../../Components/CtaSec/CtaSec'
import Layout from '../Layout/Layout'
import "../../../assets/styles/custom.css"
function About() {
  return (
    <Layout> 
        <div className="page-wrapper">

    <section className="page-title" style={{ backgroundImage: `url(${bg2})`}}>
    <div className="auto-container">
        <h2>About us</h2>
        <ul className="page-breadcrumb">
            <li><Link to="/">home</Link></li>
            <li>About us</li>
        </ul>
    </div>
    {/* <h1 data-parallax='{"x": 200}'>Car Repairing</h1> */}
</section>

<section className="about-section-three">
    <div className="auto-container">
        <div className="row">
            <div className="col-lg-7">
                <div className="content">
                    <h2>We are highly skilled mechanics for your car repair</h2>
                    <div className="text">
                        <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
                        <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional click through from DevOps. Nanotechnology immersion along the information heading towards a streamlined cloud solution. User generated content in real-time will have multiple.</p>
                        <p>Abegarage is open and offer services with good price !!!</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <div className="image">
                    <img src={im8} alt="" />
                </div>
            </div>
        </div>
    </div>
</section>

<About24/>
<WhyChooseUs/>
<BottomBanner/>
<CtaSec/>

</div>
</Layout>

  )
}

export default About