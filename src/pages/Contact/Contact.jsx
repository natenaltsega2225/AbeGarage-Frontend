import React from 'react'
import classes from "./Contact.module.css"
import Schedule from '../../components/General/Schedule/Schedule'
import Nav from '../../components/General/Nav/Nav'
import banner from "../../assets/Contact.jpeg"
import Map from '../../components/General/Map/Map'

function Contact() {
  return (
    <div className={classes.contact}>
       <Nav header="Contact Us" banner={banner}/>
        <Map />
        <Schedule />
    </div>
  )
}

export default Contact