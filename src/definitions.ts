export type Expense = {
  name: string;
  value: number;
};

export interface BudgetState {
  budget: {
    value: number;
  };
}

export interface ExpenseListState {
  expenseList: {
    value: Expense[];
  };
}

export interface ExpenseState {
  expense: {
    value: number
  }
}