import React from 'react'
import classes from "./footer.module.css"
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";

function Footer() {
  return (
    <div className={classes.container}>
        <div className={classes.content}>
            <div className={classes.wrapper}>
                <div className={classes.upper}>
                    <div className={classes.contain}>
                        <div className={classes.icon}>
                            < CiLocationOn />
                        </div>
                        <div className={classes.text}>
                            <p>54B Tailstoi Towen 5238 MIT,</p>
                            <p>La city, LA 9223384</p>
                        </div>
                    </div>
                    <div className={classes.contain}>
                        <div className={classes.icon}>
                            <TfiEmail />
                        </div>
                        <div className={classes.text}>
                            <p>Email us:</p>
                            <p>contact@gmail.com</p>
                        </div>
                    </div>
                    <div className={classes.contain}>
                        <div className={classes.icon}>
                            <IoCallOutline />
                        </div>
                        <div className={classes.text}>
                            <p>Call us on:</p>
                            <p>+1800 456 7890</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.lower}>
                <div className={classes.first}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim sed quam perferendis. Maxime sed fugit modi fugiat explicabo labore soluta mollitia perspiciatis nihil? Animi molestias maxime illum quam doloribus quidem?
                </div>
                <div className={classes.second}>
                    <h3>Usefull Links</h3>
                    <p>Home</p>
                    <p>About Us</p>
                    <p>Appointment</p>
                    <p>Testimonials</p>
                    <p>Contact Us</p>
                </div>
                <div className={classes.second}>
                    <h3>Our Services</h3>
                    <p>Performance Upgrade</p>
                    <p>Transmission Service</p>
                    <p>Break Repair & Service</p>
                    <p>Engine Service & Repair</p>
                    <p>Trye & Wheels</p>
                </div> 
                <div className={classes.third}>
                    <h3>Newsletter</h3>
                    <p>Get latest updates and offers</p>
                    <div className={classes.icons}>
                        
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Footer