import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState =  {
     email : localStorage.getItem('email')
}

const loginSlice = createSlice({
     name : 'email',
     initialState,
     reducers : {
          addEmail : (state, action) => {
               state.email = action.payload;
          },
          cleanEmail : (state) => {
               state.email = ''
          }
     }
})

export const { addEmail, cleanEmail } = loginSlice.actions;

export default loginSlice.reducer;