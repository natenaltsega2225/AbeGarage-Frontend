import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import SERVICE from "../../../../Services/service.service";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import "./ServiceList.css"; // Import the custom CSS file

const ServiceList = () => {
  const [allServices, setAllServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const { employee } = useAuth();
  let loggedInEmployeeToken = employee && employee.employee_token;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await SERVICE.getAllServices(loggedInEmployeeToken);
        setAllServices(response.services);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [allServices]);

  const handleAddService = async (event) => {
    event.preventDefault();

    const formData = {
      service_name: newServiceName,
      service_description: newServiceDescription,
    };

    try {
      await SERVICE.addService(formData, loggedInEmployeeToken);
      setNewServiceName("");
      setNewServiceDescription("");
      // Show the modal popup
      setShowAddModal(true);
      // Automatically close the modal after 2 seconds
      setTimeout(() => setShowAddModal(false), 2000);
      // Refresh the services list
      const response = await SERVICE.getAllServices(loggedInEmployeeToken);
      setAllServices(response.services);
    } catch (error) {
      console.log(error);
      alert(`Error adding service: ${error.message}`);
    }
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;

    try {
      await SERVICE.deleteService(serviceToDelete, loggedInEmployeeToken);
      setServiceToDelete(null);
      setShowDeleteModal(false);
      // Refresh the services list
      const response = await SERVICE.getAllServices(loggedInEmployeeToken);
      setAllServices(response.services);
    } catch (error) {
      console.log(error);
      alert(`Error deleting service: ${error.message}`);
    }
  };

  const confirmDeleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowDeleteModal(true);
  };

  return (
    <>
      <section className="contact-section pb-5">
        <div className="auto-container">
          <div className="contact-title">
            <div>
              <h2>Service We Provide</h2>
              <h5 className="text-secondary">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution.
              </h5>
            </div>
            {allServices.length === 0 ? (
              <p>There are no services</p>
            ) : (
              allServices.map((service) => (
                <div className="bg-white my-2 d-flex" key={service.service_id}>
                  <div className="pt-3 pb-1 px-4 flex-grow-1">
                    <h5 className="mb-1 font-weight-bold">
                      {service.service_name}
                    </h5>
                    <h6 className="mb-1 text-secondary">
                      {service.service_description}
                    </h6>
                  </div>
                  <div className="d-flex align-items-center px-4">
                    <Link
                      to={`/admin/services/service-update/${service.service_id}`}
                    >
                      <FaEdit color="red" size={20} />
                    </Link>
                    <button
                      onClick={() => confirmDeleteService(service.service_id)}
                    >
                      <MdDelete
                        color="#081336"
                        size={20}
                        style={{ marginLeft: "10px" }}
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Add a new service</h2>
          <div className="contact-form">
            <form onSubmit={handleAddService}>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    placeholder="Service name"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <textarea
                    name="service_description"
                    placeholder="Service description"
                    value={newServiceDescription}
                    onChange={(e) => setNewServiceDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group col-md-12">
                  <button className="theme-btn btn-style-one" type="submit">
                    <span>ADD SERVICE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Add Service Modal Popup */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Service Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>The new service has been successfully added.</Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal Popup */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteService}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceList;
