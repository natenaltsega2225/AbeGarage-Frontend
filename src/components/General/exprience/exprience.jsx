import React from 'react'
import classes from "./exprience.module.css"
import { FaArrowRight } from "react-icons/fa";
import banner2 from "../../../assets/banner_2.jpeg"
import banenr3 from "../../../assets/banner_3.jpeg"

function Exprience() {
  return (
    <div className={classes.exprience}>
        <div className={classes.left}>
            <div className={classes.first}>
                <img src={banner2} alt="" />
            </div>
            <div className={classes.second}>
                <img src={banenr3} alt="" />
            </div>
            <div className={classes.third}>
                <h1>24</h1>
                <p>YEARS</p>
                <p>EXPERIENCE</p>
            </div>
        </div>
        <div className={classes.right}>
                <p className={classes.header}>Welcome to Our workshop</p>
                <h2>We have 24 years experience</h2>
                <div className={classes.line}></div>
                <p>Bring to the table win win survival strategies to ensure proactive dominatio. At the end of the day. goind forward, a new normal that has envolved from generation x is on the runaway heading towards a streamlied cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
                <p>Capitalization on low hanging fruit to identify a ballpark value added activity to beta test Override the digital divide with addtional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.</p>

                <button>ABOUT US <FaArrowRight/> </button>
        </div>
    </div>
  )
}

export default Exprience