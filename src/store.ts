import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from './features/budgetSlice'
import expenseReducer from './features/expenseSlice'
import allocationListReducer from './features/allocationListSlice'
import currencyReducer from './features/currencySlice'

export default configureStore({
  reducer: {
    budget: budgetReducer,
    expense: expenseReducer,
    allocationList: allocationListReducer,
    currency: currencyReducer
  }
})