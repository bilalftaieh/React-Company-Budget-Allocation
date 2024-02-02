import { createSlice } from '@reduxjs/toolkit'

export const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    value: 0
  },
  reducers: {
    incrementByAmount :  (state, action) => {
        state.value += action.payload
    },
    decrementByAmount :  (state, action) => {
      state.value -= action.payload
  },
  }
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, decrementByAmount } = expenseSlice.actions

export default expenseSlice.reducer