import React from 'react'
import classes from './Dashboard.module.css'
import { Link, Outlet } from 'react-router-dom'

function Dash() {
  return (
    <div className={classes.admin}>
        <div className={classes.left}>
            <h2>EMPLOYEE DASHBOARD</h2>
            <ul>
                <Link to={""}><li>Dashboard</li></Link>
                <Link to={"orders"}><li>Orders</li></Link>
                <Link to={"new_order"}><li>New order</li></Link>
                
            </ul>
        </div>
        <div className={classes.right}>
            <Outlet />
        </div>
    </div>
  )
}

export default Dash