import React, { useEffect, useState } from "react";
import styles from "./SelectVehicle.module.css";
import { Table } from "react-bootstrap";
import { FaEdit, FaHandPointer, FaWindowClose } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import vehicleService from "../../../../services/vehicle.service";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../../Services/customer.service";
function CustomerProfile() {
  const navigator = useNavigate();
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [price, setPrice] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [customer, setCustomer] = useState([]);
  // Get the customer_hash from the URL
  const { customer_hash } = useParams();
  // Create a variable to hold the user's token
  let token = "";
  // Destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  const handleSelectCustomer = (customer_hash) => {
    // e.preventDefault();
    navigator(
      `/admin/order/add-new-order/select-service/${customer_hash}/${vehicles.vehicle_id}`
    );
  };
  useEffect(() => {
    const fetchSingleCustomer = customerService
      .getSingleCustomer(customer_hash, token)
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(customer);
  useEffect(() => {
    const fetchVehicles = vehicleService
      .getSingleVehicle(customer_hash, token)
      .then((response) => response.json())
      .then((data) => setVehicles(data.SingleVehicle))
      .catch((error) => console.error(error));
  }, []);
  console.log(vehicles);
  return (
    <div className={styles.serviceForm}>
      {/* Customer Info Section */}

      {/* Choose a vehicle */}
      <section className="contact-section">
        <div className="contact-title">
          <h2>Create new Order</h2>
        </div>
        <div className="auto-container">
          <div className={styles.customerInfo}>
            <h3 className={styles.customerHeader}>
              {customer?.customer_first_name} {customer?.customer_last_name}
            </h3>
            <p className={styles.customerText}>
              <span>Email:</span>
              {customer?.customer_email}
            </p>
            <p className={styles.customerText}>
              <span>Phone Number:</span>
              {customer?.customer_phone_number}
            </p>
            <p className={styles.customerText}>
              <span>Active Customer:</span>{" "}
              {customer?.active_customer_status === 1 ? "Yes" : "No"}
            </p>
            <p className={styles.customerText}>
              <button>
                <span> Edit customer info </span>
                <FaEdit color="#E90D09" onClick={"Hi"} />
              </button>
            </p>
            <FaWindowClose
              color="#E90D09"
              style={{ float: "right", cursor: "pointer", marginTop: "-100px" }}
            />
          </div>
          <div className="contact-title">
            <h3>Choose a vehicle d</h3>
          </div>
          <div className={styles.table}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Tag</th>
                  <th>Type</th>
                  <th>Serial</th>
                  <th>Color</th>
                  <th>Mileage</th>
                  <th>Choose</th>
                </tr>
              </thead>
              <tbody>
                {vehicles?.map((vehicles) => (
                  <tr key={vehicles.vehicle_id}>
                    <td>{vehicles?.vehicle_year}</td>
                    <td>{vehicles?.vehicle_make}</td>
                    <td>{vehicles?.vehicle_model}</td>
                    <td>{vehicles?.vehicle_tag}</td>
                    <td>{vehicles?.vehicle_type}</td>
                    <td>{vehicles?.vehicle_serial}</td>
                    <td>{vehicles?.vehicle_color}</td>
                    <td>{vehicles?.vehicle_mileage}</td>
                    <td>
                      <button>
                        <FaHandPointer
                          color="#EE0D19"
                          className={styles.pointerIcon}
                          onClick={() =>
                            handleSelectCustomer(customer.customer_hash)
                          }
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerProfile;
