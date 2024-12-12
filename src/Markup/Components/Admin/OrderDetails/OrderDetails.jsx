import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For accessing route parameters
import orderService from "../../../../Services/order.service"; // Import the service for fetching order data
import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
   const { order_hash } = useParams();
   const [orderDetails, setOrderDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchOrderDetails = async () => {
         try {
            const data = await orderService
               .getOrderById(order_hash)
               .then((res) => res.json())
               .then((data) => {
                  setOrderDetails(data.singleOrder[0]);
               })
               .catch(() => {
                  setError("Failed to fetch order details.");
               });
         } catch {
            setError("An error occurred while fetching the data.");
         } finally {
            setLoading(false);
         }
      };
      fetchOrderDetails();
   }, [order_hash]);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   if (!orderDetails) {
      return <div>No order details found.</div>;
   }

   return (
      <div className={styles.orderDetailsPage}>
         <div className={styles.orderDetailsContainer}>
            {/* Header Section */}
            <header className={styles.header}>
               <div className={styles.headerTop}>
                  <div className={styles.customerHeader}>
                     {/* Customer Name */}
                     <h1 className={styles.customerName}>
                        {`${orderDetails.customer_first_name} ${orderDetails.customer_last_name}`}
                     </h1>
                     {/* Short red line */}
                     <span className={styles.shortRedLine}></span>
                  </div>
                  {/* Status Badge */}
                  <span
                     className={`${styles.statusBadge} ${
                        orderDetails.order_status
                           ? styles.completed
                           : styles.inProgress
                     }`}
                  >
                     {orderDetails.order_status ? "Completed" : "In Progress"}
                  </span>
               </div>
               {/* Paragraph Description */}
               <p className={styles.description}>
                  You can track the progress of your order using this page. We
                  will constantly update this page to let you know how we are
                  progressing. As soon as we are done with the order, the status
                  will turn green. That means your car is ready for pickup.
               </p>
            </header>

            {/* Main Content */}
            <div className={styles.row}>
               {/* Customer Card */}
               <div
                  className={`${styles.detailsCard} ${styles.customerDetails}`}
               >
                  <h2 className={styles.cardHeading}>CUSTOMER</h2>
                  <p className={styles.customerName}>
                     {`${orderDetails.customer_first_name} ${orderDetails.customer_last_name}`}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Email:</strong> {orderDetails.customer_email}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Phone Number:</strong>{" "}
                     {orderDetails.customer_phone_number}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Active Customer:</strong>{" "}
                     {orderDetails.active_customer_status ? "Yes" : "No"}
                  </p>
                  {/* Red line at the bottom */}
                  <div className={styles.redLine}></div>
               </div>

               {/* Vehicle Card */}
               <div
                  className={`${styles.detailsCard} ${styles.vehicleDetails}`}
               >
                  <h2 className={styles.cardHeading}>CAR IN SERVICE</h2>
                  <p className={styles.vehicleTitle}>
                     {`${orderDetails.vehicle_make} ${orderDetails.vehicle_model} (${orderDetails.vehicle_color})`}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Vehicle Tag:</strong> {orderDetails.vehicle_tag}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Vehicle Year:</strong> {orderDetails.vehicle_year}
                  </p>
                  <p className={styles.detailItem}>
                     <strong>Vehicle Mileage:</strong>{" "}
                     {orderDetails.vehicle_mileage}
                  </p>
                  {/* Red line at the bottom */}
                  <div className={styles.redLine}></div>
               </div>
            </div>
            <div className={styles.orderServices}>
               {/* Vehicle Title Above Services */}
               <p className={styles.vehicleTitleAboveServices}>
                  {orderDetails.vehicle_make} {orderDetails.vehicle_model}
               </p>

               {/* Requested Services Heading */}
               <h2>Requested Services</h2>

               {/* Services List */}
               {orderDetails.order_services &&
               orderDetails.order_services.length > 0 ? (
                  <ul>
                     {orderDetails.order_services.map((service) => (
                        <li
                           key={service.order_service_id}
                           className={styles.serviceItem}
                        >
                           <div className={styles.serviceHeader}>
                              <p className={styles.serviceTitle}>
                                 {service.service_name}
                              </p>
                              <span
                                 className={`${styles.serviceStatusBadge} ${
                                    service.service_completed
                                       ? styles.completed
                                       : styles.inProgress
                                 }`}
                              >
                                 {service.service_completed
                                    ? "Completed"
                                    : "In Progress"}
                              </span>
                           </div>
                           <p className={styles.serviceDescription}>
                              {service.service_description}
                           </p>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p>No services associated with this order.</p>
               )}
            </div>
                 </div>
      </div>
   );
};
export default OrderDetails;
