export const createAdminSlice = (set) => ({
    displayOpt: false,
    setDisplayOpt: () => set((state)=>({displayOpt: !state.displayOpt})),

    // Service List
    serviceList: [],
    addServiceList: (data) => set((state)=> ({serviceList: state.serviceList.length > 0 ? [...state.serviceList, data]: [data]})),
    setServiceList: (data) => set({serviceList: Array.isArray(data) ? data: [data]}),
    editServiceList: (data) => set((state)=>({serviceList: state.serviceList.map((item) => item._id === data._id ? data : item)})),
    removeServiceList: (data)=> set((state)=> ({serviceList: state.serviceList.filter((item) => item._id !== data._id)})),
    
    // Selected Vehicle
    selectedVehicle: {},
    setSelectedVehicle: (data) => set({selectedVehicle: data}),

    // Customer Vehicle
    customerVehicles: [],
    setCustomerVehicles: (data) => set({ customerVehicles: Array.isArray(data) ? data : [data] }),
    addCustomerVehicle: (data) => set((state) => ({
        customerVehicles: state.customerVehicles.length > 0 ? [...state.customerVehicles, data]:[data]
    })),    
    editCustomerVehicle: (data) => set((state) => ({customerVehicles: state.customerVehicles.map((item) => item._id === data._id ? data : item)})),
    removeCustomerVehicle: (id) => set((state) => ({customerVehicles: state.customerVehicles.filter((item) => item._id !== id)})),
    
    
    // Selected Employee
    selectedEmployee: {},
    setSelectedEmployee: (data) => set({selectedEmployee: data}),

    // Selected Customer
    selectedCustomer: {},
    setSelectedCustomer: (data) => set({selectedCustomer: data}),

    // Customer List
    customerList: [],
    addCustomer: (data) => set((state) => ({customerList: state.customerList.length > 0 ? [...state.customerList, data] : [data]})),
    setCustomerList: (data) => set({customerList: data}),
    removeCustomer: (id) => set((state) => ({customerList: state.customerList.filter((item) => item._id !== id)})),
    editCustomerList: (data) => set((state) => ({customerList: state.customerList.map((item) => item._id === data._id ? data : item)})),

   
    // Employee List
    employeeList: [],
    addEmployee: (data) => set((state) => ({employeeList: state.employeeList.length > 0 ? [...state.employeeList, data] : [data]})),
    setEmployeeList: (data) => set({employeeList: data}),
    removeEmployee: (id) => set((state) => ({employeeList: state.employeeList.filter((item) => item._id !== id)})),
    editEmployeeList: (data) => set((state) => ({employeeList: state.employeeList.map((item) => item._id === data._id ? data : item)})),

    //Selected Service
    selectedService: {},
    setSelectedService: (data) => set({selectedService: data}),

    // Order List
    orderList: [],
    setOrderList: (data) => set({orderList: data}),
    addOrderList: (data) => set((state) => ({orderList : [...state.orderList, data]})),   
    editOrderList: (data) => set((state)=> ({orderList: state.orderList.map((item) => item._id === data._id ? data : item)})),
    removeOrder: (id) => set((state)=> ({orderList: state.orderList.filter((item)=> item._id !== id)}),) 
})



// 
