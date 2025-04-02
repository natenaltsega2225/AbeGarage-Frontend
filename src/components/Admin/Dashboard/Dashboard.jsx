import React from 'react'
import classes from "./Dashboard.module.css"
import Ticket from '../../General/Ticket/Ticket'
import engine from "../../../assets/car-engine.png"
import turbo from "../../../assets/power.png"
import break1 from "../../../assets/break.png"
import wheel from "../../../assets/tire-pressure.png"
import service from "../../../assets/mechanic.png"
import paint from "../../../assets/spray-gun.png"

function Dashboard() {
    const data = [
            {
                "id": 1,
                "name": "All Orders",
                "header": "OPEN FOR ALL",
                "link": "LIST OF ORDERS +",
                "icon": turbo
            },
            {
                "id": 2,
                "name": "New Orders",
                "header": "OPEN FOR LEADS",
                "link": "ADD ORDER +",
                "icon": service
            },
            {
                "id": 3,
                "name": "Employees",
                "header": "OPEN FOR ADMINS",
                "link": "LIST OF EMPLOYEES",
                "icon": break1,
            },
            {
                "id": 4,
                "name": "Add Employee",
                "header": "OPEN FOR ADMINS",
                "link": "TO ADD EMPLOYEE +",
                "icon": engine
            },
            {
                "id": 5,
                "name": "Add Customer",
                "header": "OPEN FOR ADMINS",
                "link": "TO ADD CUSTOMER +",
                "icon": wheel
            },
            {
                "id": 6,
                "name": "ALL CUSTOMERS",
                "header": "OPEN FOR ALL",
                "link": "LIST OF CUSTOMERS +",
                "icon": paint
            }
        ]


  return (
    <div className={classes.Dashboard}>
        <div className={classes.container}>
            <div className={classes.header}> 
                <h3>Admin Dashboard</h3>
                <div className={classes.line}></div>
            </div>
            <p className={classes.text}>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the ruway heading towards a streamlined cloud solution.</p>

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

export default Dashboard