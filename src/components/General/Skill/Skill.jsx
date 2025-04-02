import React from 'react'
import classes from "./Skill.module.css"
import man from "../../../assets/man.jpg"

function Skill() {
  return (
    <div className={classes.skill}>
        <div className={classes.container}>
            <div className={classes.left}>
                <h2>We are highly skilled mechanics for your car repair</h2>
                <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>
                <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information heading towards a streamlined cloud solution. User generated content in real-time will have multiple.</p>
            </div>
            <div className={classes.right}>
                <img src={man} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Skill