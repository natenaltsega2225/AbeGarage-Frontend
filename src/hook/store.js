import {create} from 'zustand'
import { createUserSlice } from './Slice/user'
import { createAdminSlice } from './Slice/admin'

export const useAppStore = create((...a)=>({
    ...createUserSlice(...a),
    ...createAdminSlice(...a),
}))
