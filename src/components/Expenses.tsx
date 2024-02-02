import { useSelector, useDispatch } from 'react-redux'
import { ExpenseListState } from '../definitions';
import { useState, useEffect } from 'react';
import { addExpense, deleteExpense } from '../features/expenseListSlice';
import { decrementByAmount, incrementByAmount } from '../features/expenseSlice';



function Header({ title }: { title: string }) {
  return <h1 className="text-3xl font-bold text-center md:text-start">{title}</h1>;
}

function Input({ label, type, onchange, empty }: { label: string; type: string, onchange: (inputValue: string) => void, empty: boolean }) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (empty) {
      setInputValue('');
    }
  }, [empty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onchange(newValue);
  }

  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Enter expense ${label.toLowerCase()}`}
      />
    </label>
  );
}


function ExpenseList() {
  const dispatch = useDispatch();
  const expenses = useSelector((state: ExpenseListState) => state.expenseList.value)

  const handleDeleteExpense = (index: number, expenseValue: number) => {
    dispatch(deleteExpense(index))
    dispatch(decrementByAmount(expenseValue))
  }

  if (expenses.length === 0) {
    return <div>No expenses found</div>; // Display a message when no expenses are found
  }

  return (
    <ul className="list-none border border-gray-200 rounded p-2">
      {expenses.map((expense, index) => (
        <li key={index} className="flex justify-between items-center my-2 border-b border-gray-200 p-3">
          <div>{expense.name}</div>
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full h-8 w-14 flex items-center justify-center">
              {expense.value}$
            </div>
            <button className="ml-4 text-red-500 hover:bg-red-400 rounded-full h-10 w-10"
              onClick={() => handleDeleteExpense(index, expense.value)}>
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}





function AddExpense() {
  const [nameValue, setNameValue] = useState('')
  const [costValue, setCostValue] = useState('')
  const [emptyInput, setEmptyInput] = useState(false)
  const dispatch = useDispatch();

  const handleNameChange = (value: string) => {
    setNameValue(value);
  }

  const handleCostChange = (value: string) => {
    setCostValue(value);
  }

  const handleAddClick = () => {
    dispatch(addExpense({ name: nameValue, value: Number(costValue) }))
    dispatch(incrementByAmount(Number(costValue)))
    setEmptyInput(true)
  }

  useEffect(() => {
    if (emptyInput) {
      setEmptyInput(false);
    }
  }, [emptyInput]);

  return (
    <div className="flex flex-col gap-4">
      <Header title="Add Expense" />
      <div className="flex gap-4 flex-col md:flex-row">
        <Input label="Name" type="text" onchange={handleNameChange} empty={emptyInput} />
        <Input label="Cost" type="number" onchange={handleCostChange} empty={emptyInput} />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs"
        onClick={handleAddClick}>
        Save
      </button>

    </div>
  );
}

export default function Expenses() {
  return (
    <div className="flex flex-col gap-7">
      <Header title="Expenses" />
      <ExpenseList />
      <AddExpense />
    </div>
  );
}
