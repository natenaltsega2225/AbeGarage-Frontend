import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import customerService from "../../../../../Services/customer.service";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    customerService
      .getAllCustomers()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCustomers(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = customers.filter(
        (customer) =>
          customer.customer_first_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_last_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.customer_email.toLowerCase().includes(query.toLowerCase()) ||
          customer.customer_phone_number
            .toLowerCase()
            .includes(query.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };
  // console.log(customers);
  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>customers</h2>
          </div>
          <div className="contact-form">
            <div className="form-group col-md-12">
              <input
                type="text"
                placeholder="Search by Name, Email, or Phone"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Actives</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0
                  ? filteredCustomers.map((customer) => (
                      <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_first_name}</td>
                        <td>{customer.customer_last_name}</td>
                        <td>{customer.customer_email}</td>
                        <td>{customer.customer_phone_number}</td>
                        <td>
                          {format(
                            new Date(customer.customer_added_date),
                            "MM - dd - yyyy | kk:mm"
                          )}
                        </td>
                        <td>
                          {customer.active_customer_status ? "Yes" : "No"}
                        </td>
                        <td>
                          <div className="edit-delete-icons">
                            <button
                              onClick={() =>
                                navigator(
                                  `/admin/customer-update/${customer.customer_hash}`
                                )
                              }
                            >
                              <FaEdit />
                            </button>{" "}
                            <button
                              onClick={() =>
                                navigator(
                                  `/admin/customer-profile/${customer.customer_hash}`
                                )
                              }
                            >
                              <FaArrowUpRightFromSquare />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : customers?.map((customer) => (
                      <tr key={customer?.customer_id}>
                        <td>{customer?.customer_id}</td>
                        <td>{customer?.customer_first_name}</td>
                        <td>{customer?.customer_last_name}</td>
                        <td>{customer?.customer_email}</td>
                        <td>{customer?.customer_phone_number}</td>
                        <td>
                          {format(
                            new Date(customer?.customer_added_date),
                            "MM - dd - yyyy | kk:mm"
                          )}
                        </td>
                        <td>
                          {customer?.active_customer_status ? "Yes" : "No"}
                        </td>
                        <td>
                          <div className="edit-delete-icons">
                            <button
                              onClick={() =>
                                navigator(
                                  `/admin/customer-update/${customer?.customer_hash}`
                                )
                              }
                            >
                              <FaEdit />
                            </button>{" "}
                            <button
                              onClick={() =>
                                navigator(
                                  `/admin/customer-profile/${customer?.customer_hash}`
                                )
                              }
                            >
                              <FaArrowUpRightFromSquare />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerList;
