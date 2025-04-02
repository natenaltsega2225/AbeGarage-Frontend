import React from 'react'
import classes from "./Schedule.module.css"
import { FaArrowRight } from "react-icons/fa";


function Schedule() {
  return (
    <div className={classes.Schedule}>
        <div className={classes.container}>
            <div className={classes.description}>
                <h3>Schedule Your Appointment Today</h3>
                <p>Your Automotive Repaire & Maintenance Service Specialist</p>
            </div>
            <p>1800.456.7890</p>
            <div className={classes.btn}>
                <p>CONTACT US</p>
                <FaArrowRight />
            </div>
        </div>
    </div>
  )
}

export default Schedule