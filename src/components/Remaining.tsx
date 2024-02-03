import { useSelector } from 'react-redux'
import { BudgetState, CurrencyState, ExpenseState } from '../definitions';

export default function Remaining() {
    const currentBudget = useSelector((state: BudgetState) => state.budget.value)
    const currentExpense = useSelector((state: ExpenseState) => state.expense.value)
    const remaining = currentBudget - currentExpense
    const currentCurrency = useSelector((state: CurrencyState) => state.currency.value)

    return (
        <div className="flex w-full p-4 rounded-md bg-lime-200 items-center 
        ">
            <p>
                Remaining : {remaining}{currentCurrency.substring(0, 2)}
            </p>
        </div>
    );
}
