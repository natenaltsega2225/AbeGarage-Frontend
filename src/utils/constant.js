const API  = import.meta.env.VITE_API_URL || "https://garage-project-backend.onrender.com/v2/" ;
console.log("Api: ", API)

//Users
export const LOGIN = `${API}user/login`;
export const USER_INFO = `${API}user/get-userInfo`
export const LOGOUT = `${API}user/log-out`
export const CHANGEPASSWORD = `${API}user/change_password`
export const FORGOTPASSWORD = `${API}user/forgot-password`
export const RESET_PASSWORD = `${API}auth/resetpassword`

//Employee
export const GETEMPLOYEEORDER = `${API}user/get-orders`
export const GETNEWORDER = `${API}user/get-new-order`
export const COMPLETEORDER = `${API}user/complete-order`



//Admin
export const GETALLEMPLOYEES = `${API}admin/get-all-employees`;
export const ADDEMPLOYEE = `${API}admin/add-employee`;
export const EDITEMPLOYEE = `${API}admin/edit-employee`;
export const DELETEEMPLOYEE = `${API}admin/delete-employee`;
export const EMPLOYEEFORWORK = `${API}admin/workEmpolyee`;



export const GETALLCUSTOMERS = `${API}admin/get-all-customers`
export const ADDCUSTOMER = `${API}admin/add-customer`
export const UPDATECUSTOMER = `${API}admin/edit-customer`
export const SEARCHCUSTOMER = `${API}admin/searchCustomer`


export const ADDVEHICLE = `${API}admin/add-vehicle`
export const GETALLVEHICLE = `${API}admin/get-all-vehicle`

export const ADDSERVICE = `${API}admin/add-service`
export const GETALLSERVICE = `${API}admin/get-all-service`
export const EDITSERVICE = `${API}admin/edit-service`
export const DELETESERVICE = `${API}admin/delete-service`

export const ADDORDER = `${API}admin/add-order`
export const GETALLORDER = `${API}admin/get-all-orders`
export const GETORDERBYID = `${API}admin/get-order-by-id`
export const EDITORDER = `${API}admin/edit-order`
export const DELETEORDER = `${API}admin/delete-order`