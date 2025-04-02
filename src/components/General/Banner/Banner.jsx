import React from 'react'
import classes from "./Banner.module.css"
import { RiPlayFill } from "react-icons/ri";

function Banner({banner, header}) {
  return (
    <div className={classes.container} style={{backgroundImage: `url(${banner})`}}>
        <div className={classes.overlay}>
          <div className={classes.content}>
            <div className={classes.year}>
              <p>Working since 1992 </p>
              <p className={classes.line}></p>
            </div>
            <h3>{header}</h3>
            <div className={classes.video}>
                <p><RiPlayFill /></p>
                <h5>WATCH INTRO VIDEO ABOUT US</h5>
            </div>
          </div>
            
        </div>
        
    </div>
  )
}

export default Banner