import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Allocation } from '../definitions';


export const allocationListSlice = createSlice({
  name: 'allocationList',
  initialState: {
    value: [] as Allocation[]
  },
  reducers: {
    addAllocation: (state, action: PayloadAction<Allocation>) => {
      state.value.push(action.payload);
    },

    deleteAllocation: (state, action) => {
      state.value.splice(action.payload, 1)
    },

    increaseAllocationBudgetBy10: (state, action) => {
      const index = action.payload;
      state.value[index].value += 10;
    },

    decreaseAllocationBudgetBy10: (state, action) => {
      const index = action.payload;
      state.value[index].value -= 10;
    }
  }
})

export const { addAllocation, deleteAllocation, increaseAllocationBudgetBy10,
  decreaseAllocationBudgetBy10 } = allocationListSlice.actions

export default allocationListSlice.reducer
