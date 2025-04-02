import React from 'react'
import classes from "./Information.module.css"
import mechanic from "../../../assets/red_mechanic.png"
import tools from "../../../assets/tools.png"
import tag from "../../../assets/price-tag.png"
import award from "../../../assets/champion.png"
import { GiCheckMark } from "react-icons/gi";
import cars from "../../../assets/polished_car.jpg"

function Information() {
  return (
    <div className={classes.Information}>
        <div className={classes.center}>
            <div className={classes.left}>
                <div className={classes.header}>
                    <h2>Why Choose Us</h2>
                    <div className={classes.line}></div>
                </div>
                <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward,a new normal that has evolved from generation heading towards.</p>
                <ul>
                    <li>
                        <img src={mechanic} alt="Mechanic" />
                        <p>Certified Expert Mechanics</p>
                    </li>
                    <li>
                        <img src={tools} alt="Tools" />
                        <p>Fast and Quality Service</p>
                    </li>
                    <li>
                        <img src={tag} alt="Price Tag" />
                        <p>Best Prices in Town</p>
                    </li>
                    <li>
                        <img src={award} alt="Awards" />
                        <p>Awarded Workshop</p>
                    </li>
                </ul>
            </div>
            <div className={classes.right}>
                <div className={classes.header}>
                    <h2>Additional Services</h2>
                    <div className={classes.line}></div>
                </div>
                <div className={classes.container}>
                    <img src={cars} alt="" />
                    <div className={classes.descripition}>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>General Auto Repair & Maintenance</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Transmission Repair & Replacement</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Tire Repair and Replacement</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>State Emissions Inspection</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Break Job / Break Services</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Electrical Diagnostics</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Fuel System Repairs</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Starting and Changing Repair</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Streering and Suspension Work</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Emission Repair Facility</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Wheel Aligment</p>
                        </div>
                        <div className={classes.text}>
                            <p className={classes.mark}><GiCheckMark /></p>
                            <p>Computer Diagnostic Testing</p>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
  )
}

export default Information