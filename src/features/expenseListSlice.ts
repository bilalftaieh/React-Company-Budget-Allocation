import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Expense } from '../definitions';


export const expenseListSlice = createSlice({
  name: 'expenseList',
  initialState : {
    value : [] as Expense[]
  },
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.value.push(action.payload);
    },

    deleteExpense:(state, action) =>{
      state.value.splice(action.payload,1)
    }
  }
})

export const { addExpense, deleteExpense } = expenseListSlice.actions

export default expenseListSlice.reducer
