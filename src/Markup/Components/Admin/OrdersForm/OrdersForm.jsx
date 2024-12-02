import React from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import styles from "./OrdersForm.module.css";

const OrdersForm = () => {
   return (
      <div className={styles.newOrderForm}>
         <h2>Order Details</h2>
         {/* Add form fields for order details */}
         <form>
            <div className={styles.formGroup}>
               <label htmlFor="orderName">Order Name</label>
               <input
                  type="text"
                  id="orderName"
                  placeholder="Enter order name"
               />
            </div>
            {/* Add other fields as necessary */}
            <button type="submit" className={styles.submitButton}>
               Submit Order
            </button>
         </form>
      </div>
   );
};

export default OrdersForm;
