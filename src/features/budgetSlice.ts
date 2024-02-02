import { createSlice } from '@reduxjs/toolkit'

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    value: 0
  },
  reducers: {
    changeBudget :  (state, action) => {
        state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeBudget } = budgetSlice.actions

export default budgetSlice.reducer