import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const Card_Data = [
    {
      link: "/orders",
      h5: "Open For All",
      h2: "All Orders",
      div: "LIST OF ORDERS +",
      icon: "flaticon-power",
    },
    {
      link: "/order",
      h5: "Admin Role",
      h2: "Create Order",
      div: "NEW ORDER +",
      icon: "flaticon-power",
    },
    {
      link: "/add-employee",
      h5: "Admin Role",
      h2: "Add Employee",
      div: "EMPLOYEE +",
      icon: "flaticon-work-team",
    },
    {
      link: "/employees",
      h5: "Open For All",
      h2: "Employees List",
      div: "EMPLOYEES LIST",
      icon: "flaticon-work-team",
    },
    {
      link: "/add-customer",
      h5: "Admin Role",
      h2: "Add Customer",
      div: "CUSTOMER +",
      icon: "flaticon-customer-service",
    },
    {
      link: "/customers",
      h5: "Open For All",
      h2: "Customers ",
      div: "CUSTOMERS ",
      icon: "flaticon-car-service",
    },
    {
      link: "/services",
      h5: "Open For All",
      h2: "Services List",
      div: "SERVICE +",
      icon: "flaticon-customer-service-1",
    },
    {
      link: "/customers",
      h5: "Open For All",
      h2: "Customers ",
      div: "CUSTOMERS ",
      icon: "flaticon-car-service",
    },
    {
      link: "/services",
      h5: "Open For All",
      h2: "Services List",
      div: "SERVICE +",
      icon: "flaticon-customer-service-1",
    },
  ];

  return (
    <div>
      <section className="services-section">
        <div className="mx-3">
          <div className="sec-title style-two">
            <h2>Admin Dashboard</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>

          <div className="row">
            {Card_Data.map((Dashboard_card) => (
              <div
                className="col-lg-4 service-block-one"
                key={Dashboard_card.link}
              >
                <Link
                  to={Dashboard_card.link}
                  aria-label={`Navigate to ${Dashboard_card.h2}`}
                >
                  <div className="inner-box hvr-float-shadow" role="button">
                    <h5>{Dashboard_card.h5}</h5>
                    <h2>{Dashboard_card.h2}</h2>
                    <div className="read-more">{Dashboard_card.div}</div>
                    <div className="icon">
                      <span
                        className={Dashboard_card.icon}
                        aria-hidden="true"
                      ></span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
