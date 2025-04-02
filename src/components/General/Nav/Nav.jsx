import React from 'react'
import classes from "./Nav.module.css"
function Nav({header, banner}) {
  return (
    <div className={classes.Nav} style={{backgroundImage: `url(${banner})`}}>
        <div className={classes.container}>
            <div className={classes.content}>
            <h1>{header === "Service" ? `Our ${header}`: header}</h1>
            <p><span>HOME</span>&nbsp; &nbsp; &gt; &nbsp;{` ${header}`}</p>
            </div>
           
        </div>
    </div>
  )
}

export default Nav