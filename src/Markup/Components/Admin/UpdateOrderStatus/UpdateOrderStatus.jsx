import React, { useEffect, useState } from "react";
import orderService from "../../../../Services/order.service"; // Import the service
import styles from "./UpdateOrderStatus.module.css";
import { useAuth } from "./../../../../Contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrderStatus = () => {
  const { order_hash } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [updatedServices, setUpdatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusBadge, setStatusBadge] = useState("In Progress");
const navigate = useNavigate();
  const { toggleOrdersUpdated } = useAuth(); // Consume `toggleOrdersUpdated`

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await orderService.getOrderById(order_hash);
        const data = await response.json();

        const order = data.singleOrder[0];
        setOrderDetails(order);

        const initialServices = order.order_services.map((service) => ({
          order_service_id: service.order_service_id,
          completed_value: service.service_completed,
        }));

        setUpdatedServices(initialServices);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_hash]);

  useEffect(() => {
    const allServicesCompleted = updatedServices.every(
      (service) => service.completed_value === 1
    );
    setStatusBadge(allServicesCompleted ? "Completed" : "In Progress");
  }, [updatedServices]);

  const handleCheckboxChange = (id, value) => {
    setUpdatedServices((prev) =>
      prev.map((service) =>
        service.order_service_id === id
          ? { ...service, completed_value: value }
          : service
      )
    );
  };

  const handleSave = async () => {
    try {
      const order_status = updatedServices.every(
        (service) => service.completed_value === 1
      )
        ? 1 // Set order status to 1 (Completed) if all services are completed
        : 0; // Otherwise, set order status to 0 (In Progress)
      const data = {
        order_id: orderDetails.order_id,
        service_completed: updatedServices,
      };
      await orderService
        .updateOrderStatus(data)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      alert("Order status updated successfully!");
      navigate('/admin/orders')

      // Notify the OrdersPage of the update
      toggleOrdersUpdated(); // Call toggleOrdersUpdated to trigger re-fetch
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.orderDetailsPage}>
      <div className={styles.orderDetailsContainer}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.customerHeader}>
              <h1 className={styles.customerName}>
                {`${orderDetails.customer_first_name} ${orderDetails.customer_last_name}`}
              </h1>
              <span className={styles.shortRedLine}></span>
            </div>
            <span
              className={`${styles.statusBadge} ${
                statusBadge === "Completed"
                  ? styles.completed
                  : styles.inProgress
              }`}
            >
              {statusBadge}
            </span>
          </div>
        </header>

        {/* Row Layout for Cards */}
        <div className={styles.row}>
          {/* Customer Card */}
          <div className={`${styles.detailsCard} ${styles.customerDetails}`}>
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
          </div>

          {/* Vehicle Card */}
          <div className={`${styles.detailsCard} ${styles.vehicleDetails}`}>
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
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.orderServices}>
          <h2>Requested Services</h2>
          {orderDetails.order_services.length > 0 ? (
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
                    <label className={styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={
                          !!updatedServices.find(
                            (s) =>
                              s.order_service_id === service.order_service_id &&
                              s.completed_value === 1
                          )
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            service.order_service_id,
                            e.target.checked ? 1 : 0
                          )
                        }
                      />
                      <span className={styles.checkboxDisplay}></span>
                    </label>
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

        {/* Save Button */}
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateOrderStatus;
