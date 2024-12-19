import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CreateNewOrder.module.css";
import { FaEdit } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import customerService from "../../../../Services/customer.service";
import vehicleService from "../../../../services/vehicle.service";
import orderService from "../../../../services/order.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import SERVICe from "../../../../services/service.service";
import { BeatLoader } from "react-spinners";
function CreateNewOrder() {
  const { customer_hash, vehicle_id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState([]);
  const [additional_request, setAdditionalRequest] = useState("");
  const [notes_for_internal_use, setNotesForInternalUse] = useState("");
  const [notes_for_customer, setNotesForCustomer] = useState("");
  const [estimated_completion_date, setEstimatedCompletionDate] = useState("");
  const [order_total_price, setOrderTotalPrice] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigator = useNavigate();
  //get token from auth context
  let token = "";
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    token = employee.employee_token;
  }
  const handleServiceSelection = (service_id) => {
    const service = services.find((s) => s.service_id === service_id);
    if (service) {
      // Create a new order object with the selected service
      const newService = {
        service_id: service.service_id,
      };
      // Add the new order to the orders array
      setNewService((prev) => [...prev, newService]);
    }
  };
  //A function handle  create new order
  const handleCreateNewOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      employee_id: employee.employee_id,
      customer_id: customer.customer_id,
      vehicle_id: vehicle.vehicle_id,
      order_date: new Date().toISOString(),
      order_total_price: order_total_price,
      estimated_completion_date: estimated_completion_date,
      additional_request: additional_request,
      notes_for_internal_use: notes_for_internal_use,
      notes_for_customer: notes_for_customer,
      additional_requests_completed: 0,
      order_services: newService,
    };
    const response = orderService
      .createNewOrder(newOrder, token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigator("/admin/orders");
      });
  };
  // console.log(newService)
  //A fujnction to get the customer info
  const fetchCustomer = async () => {
    const response = customerService
      .getSingleCustomer(customer_hash)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCustomer(data);
      });
  };
  //A fujnction to get the vehicle info
  const fetchVehicle = async () => {
    const response = vehicleService
      .getSingleVehicle(customer_hash)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setVehicle(data.SingleVehicle[0]);
      });
  };
  // A fujnction to get all services
  const fetchServices = async () => {
    const response = await SERVICe.getAllServices();
    setServices(response.services);
  };
  useEffect(() => {
    fetchCustomer();
    fetchVehicle();
    fetchServices();
  }, []);
  // console.log(newService);
  return (
    <div style={{ backgroundColor: "#f5f5f5", margin: "-10px" }}>
      <div className={styles.serviceForm}>
        {/* Customer Info Section */}

        {/* Choose a vehicle */}
        <section className="contact-section pb-5 ">
          {/*  */}

          {/*Create New Order 3*/}
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-  ">
              <div className="contact-title">
                <h2>Create new Order</h2>
              </div>
            </div>
          </div>

          {/* customer Info */}
          <div className="contact-section pt-0 pb-4">
            <div className="mr-5  ">
              {/* Customer Info */}
              <div className={styles.customerInfo}>
                <h3 className={styles.customerHeader}>
                  {customer?.customer_first_name} {customer?.customer_last_name}
                </h3>
                <p className={styles.customerText}>
                  <span>Email: </span>
                  {customer?.customer_email}
                </p>
                <p className={styles.customerText}>
                  <span>Phone Number: </span>
                  {customer?.customer_phone_number}
                </p>
                <p className={styles.customerText}>
                  <span>Active Customer:</span>{" "}
                  {customer?.active_customer_status === 1 ? "Yes" : "No"}
                </p>
                <p className={styles.customerText}>
                  <button style={{ backgroundColor: "white" }}>
                    <span> Edit customer info </span> <FaEdit color="#E90D09" />
                  </button>
                </p>
                <FaWindowClose
                  color="#E90D09"
                  style={{
                    float: "right",
                    cursor: "pointer",
                    marginTop: "-100px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* vehicle Info */}
          <div className="contact-section pt-0 pb-4 ">
            <div className="mr-5 ">
              {/* Customer Info */}
              <div className={styles.customerInfo}>
                <h3 className={styles.customerHeader}>
                  {vehicle?.vehicle_model}
                </h3>
                <p className={styles.customerText}>
                  <span>Vehicle color: </span>
                  {vehicle?.vehicle_color}
                </p>
                <p className={styles.customerText}>
                  <span>Vehicle tag: </span>
                  {vehicle?.vehicle_tag}
                </p>
                <p className={styles.customerText}>
                  <span>Vehicle year:</span> {vehicle?.vehicle_year}
                </p>
                <p className={styles.customerText}>
                  <span>Vehicle mileage: {vehicle?.vehicle_mileage}</span>
                </p>
                <p className={styles.customerText}>
                  <span>Vehicle serial: </span>
                  {vehicle?.vehicle_serial}
                </p>
                <p className={styles.customerText}>
                  <button style={{ backgroundColor: "white" }}>
                    <span> Edit vehicle info</span> <FaEdit color="#E90D09" />
                  </button>
                </p>
                <FaWindowClose
                  color="#E90D09"
                  style={{
                    float: "right",
                    cursor: "pointer",
                    marginTop: "-100px",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Choose Service  */}
          <form
            onSubmit={handleCreateNewOrder}
            className="contact-section pt-0 pb-4"
          >
            <div className="mr-5  ">
              <div className="pb-0  d-flex order-danger ">
                <div className="contact-title ">
                  <div>
                    <h2>Choose Service</h2>{" "}
                  </div>
                  {services?.map((service, i) => (
                    <div
                      key={i}
                      className="bg-white Regular my-2 d-flex  shadow-sm"
                    >
                      <div className="py-4 pb-1 px-4 flex-grow-1 ">
                        <h5 className="mb-1 font-weight-bold ">
                          {service.service_name}
                        </h5>
                        <h6 className=" mb-1 text-secondary">
                          {service.service_description}
                        </h6>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          value={service.service_id}
                          onChange={(e) =>
                            handleServiceSelection(
                              service.service_id,
                              e.target.checked
                            )
                          }
                          className={styles.serviceCheckbox}
                        />
                      </div>
                      <div className="d-flex align-items-center px-4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Add New Service */}
            <div className="mr-5 mt-4 contact-title ">
              <div className="pb-0  d-flex order-danger ">
                <div className="p-3 px-5 flex-grow-1 bg-white ">
                  <h2>Additional request</h2>
                  <div className="contact-form ">
                    <div>
                      <div className="row clearfix">
                        <h3 className="ml-3">Service Description</h3>
                        <div className="form-group col-md-12">
                          <textarea
                            type="text"
                            name="service_description"
                            placeholder="Additional Service Description"
                            onChange={(e) =>
                              setAdditionalRequest(e.target.value)
                            }
                            value={additional_request}
                            required
                          ></textarea>
                        </div>

                        <h3 className="ml-3">Notes For Internal Use</h3>
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            className="wide-checkbox"
                            name="service_name"
                            placeholder="Notes For Internal Use"
                            onChange={(e) =>
                              setNotesForInternalUse(e.target.value)
                            }
                            value={notes_for_internal_use}
                            required
                          />
                        </div>

                        <h3 className="ml-3">Notes For Customer</h3>
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            className="wide-checkbox"
                            name="service_name"
                            placeholder="notes_for_customer"
                            onChange={(e) =>
                              setNotesForCustomer(e.target.value)
                            }
                            value={notes_for_customer}
                            required
                          />
                        </div>

                        {/* <h3 className="ml-3">Order Description</h3>
                        <div className="form-group col-md-12">
                          <input
                            type="text"
                            className="wide-checkbox"
                            name="service_name"
                            placeholder="order_description"
                            // ref={order_descriptionDom}
                            // onChange={order_descriptionTracker}
                            // value={order_description}
                            required
                          />
                        </div> */}

                        <h3 className="ml-3">Estimated Completion Date</h3>
                        <div className="form-group col-md-12">
                          <input
                            type="date"
                            className="p-3 bg-dark white"
                            name="service_name"
                            placeholder="estimated_completion_date"
                            // ref={estimated_completion_dateDom}
                            onChange={(e) =>
                              setEstimatedCompletionDate(e.target.value)
                            }
                            value={estimated_completion_date}
                            required
                          />
                        </div>

                        <h3 className="ml-3">Total Service Price</h3>
                        <div className="form-group col-md-12">
                          <input
                            type="number"
                            className="wide-checkbox"
                            name="service_name"
                            placeholder="Total Service Price"
                            onChange={(e) => setOrderTotalPrice(e.target.value)}
                            value={order_total_price}
                            required
                          />
                        </div>

                        <div className="form-group col-md-12 pl-3">
                          <button
                            className="theme-btn btn-style-one"
                            type="submit"
                          >
                            <span>
                              {spinner ? (
                                <BeatLoader color="white" size={8} />
                              ) : (
                                "CREATE ORDER"
                              )}
                            </span>
                          </button>

                          {/* {serverMsg && (
                          <div
                            className="validation-error"
                            style={{
                              color: "red",
                              fontSize: "100%",
                              fontWeight: "600",
                              padding: "25px",
                            }}
                            role="alert"
                          >
                            {/* {serverMsg} */}
                          {/* </div>
                        )} */}
                          {/* } */}

                          {/* {serverMsg1 && (
                          <div
                            className="validation-error"
                            style={{
                              color: "green",
                              fontSize: "100%",
                              fontWeight: "600",
                              padding: "25px",
                            }}
                            role="alert"
                          >
                            {serverMsg1}
                          </div>
                        )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CreateNewOrder;
