import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext";
import SERVICE from "../../../../Services/service.service";

const EditService = () => {
  const { id: servicesId } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  let loggedInEmployeeToken = employee && employee.employee_token;

  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await SERVICE.singleService(
          servicesId,
          loggedInEmployeeToken
        );
        setServiceName(response.service.service_name || "");
        setServiceDescription(response.service.service_description || "");
        console.log(response.service);
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, [servicesId, loggedInEmployeeToken]);

  const handleUpdateService = async (e) => {
    e.preventDefault();

    const formData = {
      service_name: serviceName,
      service_description: serviceDescription,
    };
    console.log(formData);
    try {
      const response = await SERVICE.updateService(
        servicesId,
        formData,
        loggedInEmployeeToken
      );
      console.log("service updated successfully:", response);
      navigate("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error.message);
      alert(`Error updating service: ${error.message}`);
    }
  };

  return (
    <section className="contact-section pb-5">
      <div className="bg-white px-5 pt-5 mt-4 contact-title mb-1">
        <h2>{`Update (${serviceName}) Service`} </h2>
        <div className="contact-form">
          <form onSubmit={handleUpdateService}>
            <div className="row clearfix">
              <div className="form-group col-md-12">
                <input
                  type="text"
                  name="service_name"
                  placeholder="Service name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group col-md-12">
                <textarea
                  name="service_description"
                  placeholder="Service description"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="form-group col-md-12">
                <button className="theme-btn btn-style-one" type="submit">
                  <span>UPDATE SERVICE</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditService;
