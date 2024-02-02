import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from './features/budgetSlice'
import expenseReducer from './features/expenseSlice'
import expenseListReducer from './features/expenseListSlice'

export default configureStore({
  reducer: {
    budget: budgetReducer,
    expense: expenseReducer,
    expenseList: expenseListReducer
  }
})