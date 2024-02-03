import { useSelector } from 'react-redux'
import { CurrencyState, ExpenseState } from '../definitions'

export default function SpentSoFar() {
    const currentExpense = useSelector((state: ExpenseState) => state.expense.value)
    const currentCurrency = useSelector((state: CurrencyState) => state.currency.value)

    return (
        <div className="flex p-4 rounded-md bg-custom-one items-center w-full 
        ">
            <p>
                Spent So Far : {currentExpense}{currentCurrency.substring(0, 2)}
            </p>
        </div>
    )
}