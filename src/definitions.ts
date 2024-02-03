export type Allocation = {
  name: string;
  value: number;
};

export interface BudgetState {
  budget: {
    value: number;
  };
}

export interface AllocationListState {
  allocationList: {
    value: Allocation[];
  };
}

export interface ExpenseState {
  expense: {
    value: number
  }
}

export interface CurrencyState {
  currency: {
    value: string
  }
}