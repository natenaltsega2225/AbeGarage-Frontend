// import React from 'react'



// function EmployeeUpdateForm() {
//   return (

// // Form Fields:
// // o Employee first name, 
// // last name, 
// // employee ID,
// // role (dropdown).
// // o Checkbox for "Is active employee".
//     <div>
//      const formData = {
//       employee_email,
//       employee_first_name,
//       employee_last_name,
//       employee_phone,
//       employee_password,
//       active_employee,
//       employee_role,
//     };

// const newEmployee = employeeService.createEmployee(
//       formData
//       ,loggedInEmployeeToken
//     );
//     newEmployee
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         // If Error is returned from the API server, set the error message
//         if (data.error || data.errors) {
//           setServerError(data.error || data.errors);
//         } else {
//           // Handle successful response
//           setSuccess(true);
//           setServerError("");
//           // Redirect to the employees page after 2 seconds
//           // For now, just redirect to the home page
//           setTimeout(() => {
//             // window.location.href = '/admin/employees';
//             window.location.href= "/";
//           }, 2000);
//         }
//       })
//       // Handle Catch
//       .catch((error) => {
//         const resMessage =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//         setServerError(resMessage);
//       });
//   };
//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Add a new employee</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit} className="formSize">
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       {serverError && (
//                         <div className="validation-error" role="alert">
//                           {serverError}
//                         </div>
//                       )}
//                       <input
//                         type="email"
//                         name="employee_email"
//                         value={employee_email}
//                         onChange={(event) => setEmail(event.target.value)}
//                         placeholder="Employee email"
//                       />
//                       {emailError && (
//                         <div className="validation-error" role="alert">
//                           {emailError}
//                         </div>
//                       )}
//                     </div>
//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_first_name"
//                         value={employee_first_name}
//                         onChange={(event) => setFirstName(event.target.value)}
//                         placeholder="Employee first name"
//                       />
//                       {firstNameRequired && (
//                         <div className="validation-error" role="alert">
//                           {firstNameRequired}
//                         </div>
//                       )}
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_last_name"
//                         value={employee_last_name}
//                         onChange={(event) => setLastName(event.target.value)}
//                         placeholder="Employee last name"
//                         required
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="employee_phone"
//                         value={employee_phone}
//                         onChange={(event) => setPhoneNumber(event.target.value)}
//                         placeholder="Employee phone (555-555-5555)"
//                         required
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <select
//                         name="employee_role"
//                         value={employee_role}
//                         onChange={(event) =>
//                           setEmployee_role_id(event.target.value)
//                         }
//                         className="custom-select-box"
//                       >
//                         <option value="1">Employee</option>
//                         <option value="2">Manager</option>
//                         <option value="3">Admin</option>
//                       </select>
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="password"
//                         name="employee_password"
//                         value={employee_password}
//                         onChange={(event) => setPassword(event.target.value)}
//                         placeholder="Employee password"
//                       />
//                       {passwordError && (
//                         <div className="validation-error" role="alert">
//                           {passwordError}
//                         </div>
//                       )}
//                     </div>

//                     <div className="form-group col-md-12">
//                       <button
//                         className="theme-btn btn-style-one"
//                         type="submit"
//                         data-loading-text="Please wait..."
//                       >
//                         <span>Add employee</span>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>





//     </div>
//   )
// }

// export default EmployeeUpdateForm