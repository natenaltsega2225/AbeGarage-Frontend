export const createUserSlice = (set) => ({
    userInfo: {},
    counter: 0,
    setUserInfo: (data) => set({userInfo: data}),
    addCount: () => set((state)=> ({counter: state.counter + 1})) ,

    //Orders
    orders: [],
    setOrders: (data)=> set({orders: data}),
    addOrder: (data) => set((state)=> ({orders: [...state.orders, data]})),
    editOrder: (data) => set((state) => ({orders : state.orders.map((item)=> item._id === data._id ? data : item)})),

    newOrder: {},
    setNewOrder: (data) => set({newOrder: data}),

    isMobile: false,
    setMobile: (data) => set({isMobile: data}),

})