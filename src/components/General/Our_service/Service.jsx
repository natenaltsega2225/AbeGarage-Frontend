import React from 'react'
import classes from "./Service.module.css"
import engine from "../../../assets/car-engine.png"
import turbo from "../../../assets/power.png"
import break1 from "../../../assets/break.png"
import wheel from "../../../assets/tire-pressure.png"
import service from "../../../assets/mechanic.png"
import paint from "../../../assets/spray-gun.png"
import Ticket from '../Ticket/Ticket'

function Service() {

    const data = [
        {
            "id": 1,
            "name": "Performance Upgrade",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": turbo
        },
        {
            "id": 2,
            "name": "Transmission Services",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": service
        },
        {
            "id": 3,
            "name": "Break Repair & Services",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": break1,
        },
        {
            "id": 4,
            "name": "Engine Service & Repair",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": engine
        },
        {
            "id": 5,
            "name": "Tyre & Wheels",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": wheel
        },
        {
            "id": 6,
            "name": "Denting & Painting",
            "header": "SERVICE AND REPAIRS",
            "link": "READ MORE +",
            "icon": paint
        }
    ]


  return (
    <div className={classes.service}>
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <h1>Our Services</h1>
                <div className={classes.line}></div>
            </div>
            <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation x is on the runway heading towards a streamlined cloud solution.</p>
            <div className={classes.serviceContainer}>
                {
                    data.map(dataitem => 
                           <Ticket key={data.id} data={dataitem}/>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Service