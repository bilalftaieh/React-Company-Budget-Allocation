import { createSlice } from '@reduxjs/toolkit'

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    value: 0
  },
  reducers: {
    changeBudget: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { changeBudget } = budgetSlice.actions

export default budgetSlice.reducer