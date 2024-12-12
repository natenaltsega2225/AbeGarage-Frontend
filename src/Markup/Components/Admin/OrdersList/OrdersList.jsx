import React, { useEffect, useState } from "react";
import styles from "./OrdersList.module.css";
import orderService from "../../../../Services/order.service";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await orderService.getOrders();
        const data = await ordersData.data;
        // console.log(data);
        setOrders(data);
      } catch (error) {
        setError(error.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div className={`container-fluid ${styles.ordersPage}`}>
      <h1 className={styles.pageTitle}>
        Orders
        <span className={styles.redLine}></span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className={`table-responsive ${styles.ordersTable}`}>
          <table className="table table-bordered">
            <thead className={styles.tableHeader}>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Order Date</th>
                <th>Received by</th>
                <th>Order Status</th>
                <th>View/Edit</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.customer_first_name} {order.customer_last_name}
                    <br />
                    <span className={styles.secondaryText}>
                      {order.customer_email}
                    </span>
                    <br />
                    <span className={styles.secondaryText}>
                      {order.customer_phone_number}
                    </span>
                  </td>
                  <td>
                    {order.vehicle_make} {order.vehicle_model}
                    <br />
                    <span className={styles.secondaryText}>
                      {order.vehicle_year} - {order.vehicle_tag}
                    </span>
                  </td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>
                    {order.employee_first_name} {order.employee_last_name}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        order.order_status === 0
                          ? styles.inProgress
                          : order.order_status === 1
                          ? styles.completed
                          : styles.received
                      }`}
                    >
                      {order.order_status === 0
                        ? "In Progress"
                        : order.order_status === 1
                        ? "Completed"
                        : "Received"}
                    </span>
                  </td>
                  <td>
                    <span style={{ marginRight: "20px" }}>
                      <a
                        href={`/admin/orders/${order.order_hash}`}
                        className={styles.viewEditLink}
                      >
                        <FaArrowUpRightFromSquare color="#081336" />
                      </a>
                    </span>
                    <span>
                      <a
                        href={`/order-update/${order.order_hash}`}
                        className={styles.viewEditLink}
                      >
                        <FaEdit color="#081336" />
                      </a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
