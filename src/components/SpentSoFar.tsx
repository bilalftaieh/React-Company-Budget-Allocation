import { useSelector } from 'react-redux'
import { ExpenseState } from '../definitions'

export default function SpentSoFar() {
    const currentExpense = useSelector((state: ExpenseState) => state.expense.value)
    return (
        <div className="flex p-4 rounded-md bg-custom-one items-center w-full 
        ">
            <p>
                Spent So Far : {currentExpense}$
            </p>
        </div>
    )
}