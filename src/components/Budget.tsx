import { useSelector, useDispatch } from 'react-redux'
import { changeBudget } from '../features/budgetSlice';
interface BudgetState {
    budget: {
        value: number;
    };
}

export default function Budget() {
    const budget = useSelector((state: BudgetState) => state.budget.value);
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col md:flex-row p-4 rounded-md bg-gray-300 
        space-y-4 md:space-y-0 md:space-x-10 items-center">
            <div className='flex flex-col gap-2 items-center'>
                <p>
                    Budget
                </p>
                <p>
                    {budget}$
                </p>
            </div>


            <input
                type="number"
                placeholder="enter your budget"
                onChange={(e) => dispatch(changeBudget(Number(e.target.value)))}
                className="py-2 px-3 rounded border border-gray-300 focus:border-indigo-300 
                focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

        </div>
    )
}

