import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    value: '$ USD'
  },
  reducers: {
    changeCurrentCurrency: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { changeCurrentCurrency } = currencySlice.actions

export default currencySlice.reducer