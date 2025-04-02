import React from 'react'
import classes from "./Quality.module.css"
import car from "../../../assets/car.jpg"
function Quality() {
  return (
    <div className={classes.Quality}>
        <div className={classes.left}>
            <h2>Quality Service And</h2>
            <h2>Customer Satisfaction !!</h2>
            <p>We utilize the most recent symptomatic gear to ensure your vehicle is fixed or adjusted appropriately and in an opportune manner. We are an individual from Professional Auto Service, a first class execution arrange, where free assistance offices share shared objectives of being world-class car administration focuses. </p>
        </div>
        <div className={classes.right}>
            <img src={car} alt="" />
        </div>
    </div>
  )
}

export default Quality