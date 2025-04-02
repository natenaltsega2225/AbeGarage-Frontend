import React from 'react'
import classes from "./Map.module.css"
import { CiLocationOn } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";

function Map() {
  return (
    <div className={classes.map} >
        <div className={classes.content}>
            <div className={classes.left}>
            <div style={{width: "100%", height: "100%"}}><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Botswana%20Street,%20Addis%20Ababa+(Garage%20Map)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/collections/drones/">buy drones</a></iframe></div>
            </div>
            <div className={classes.right}>
                <h2>Our Address</h2>
                <p>Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service</p>
                <div className={classes.address}>
                    <p>< CiLocationOn /></p>
                    <div className={classes.text}>
                        <h4>Address</h4>
                        <p>54B, Tailstoi Town 5238 MIT, La city, IA 5224</p>
                    </div>
                </div>
                <div className={classes.address}>
                    <p>< TfiEmail /></p>
                    <div className={classes.text}>
                        <h4>Email: </h4>
                        <p>contact@gmail.com</p>
                    </div>
                </div>
                <div className={classes.address}>
                    <p>< IoCallOutline /></p>
                    <div className={classes.text}>
                        <h4>Phone: </h4>
                        <p>1800 456 7890 / 1254 897 3654</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Map