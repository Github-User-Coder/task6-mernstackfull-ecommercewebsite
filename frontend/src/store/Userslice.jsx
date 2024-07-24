import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user:null
  }
  
  export const Userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setuserdetails :(state,action)=>{
            state.user=action.payload

        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setuserdetails } = Userslice.actions
  
  export default Userslice.reducer