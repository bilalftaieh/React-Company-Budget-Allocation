import { useSelector, useDispatch } from 'react-redux'
import { AllocationListState, BudgetState, CurrencyState, ExpenseState } from '../definitions';
import { useState, useEffect } from 'react';
import { decrementByAmount, incrementByAmount } from '../features/expenseSlice';
import { addAllocation, decreaseAllocationBudgetBy10, deleteAllocation, increaseAllocationBudgetBy10 } from '../features/allocationListSlice';
import { IoMdAdd, IoMdRemove } from "react-icons/io";


function AllocationsHeader({ title }: { title: string }) {
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
    <div className="flex gap-3 items-center">
      <span className="text-gray-700">{label}</span>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Enter Allocated Budget ${label.toLowerCase()}`}
        required
      />
    </div>
  );
}


interface SelectProps {
  name: string;
  options: string[];
  onChange: (selectValue: string) => void;
  reset: boolean;
}

function Select({ name, options, onChange, reset }: SelectProps) {

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (reset) {
      setSelectedValue("");
    }
  }, [reset]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  }

  return (
    <div className="flex items-center space-x-2 bg-gray-200 rounded-md">
      <div className="text-lg px-2">{name}</div>
      <select
        className="border border-gray-300  p-2 h-full ml-5"
        onChange={handleSelectChange}
        value={selectedValue}
        required
      >
        <option value="" disabled>Choose a {name.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface buttonProps {
  onClick: () => void;
}
// Button Components
const IncreaseButton = ({ onClick }: buttonProps) => (
  <button className="bg-green-500 hover:bg-green-400 font-bold text-white rounded-full text-5xl" onClick={onClick}
  >
    <IoMdAdd />
  </button>
);

const DecreaseButton = ({ onClick }: buttonProps) => (
  <button className="bg-red-500 hover:bg-red-400 font-bold text-white rounded-full text-5xl"
    onClick={onClick}
  >
    <IoMdRemove />
  </button>
);

const DeleteButton = ({ onClick }: buttonProps) => (
  <button
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full "
    onClick={onClick}
  >
    <p className='text-3xl'>X</p>
  </button>
);



function AllocationList() {
  const dispatch = useDispatch();
  const allocations = useSelector((state: AllocationListState) => state.allocationList.value);
  const currentCurrency = useSelector((state: CurrencyState) => state.currency.value);

  const handleDeleteAllocation = (index: number, allocationValue: number) => {
    dispatch(deleteAllocation(index));
    dispatch(decrementByAmount(allocationValue));
  };

  const handleIncreaseAllocationBy10 = (index: number) => {
    dispatch(increaseAllocationBudgetBy10(index))
    dispatch(incrementByAmount(10))
  };

  const handleDecreaseAllocationBy10 = (index: number) => {
    dispatch(decreaseAllocationBudgetBy10(index))
    dispatch(decrementByAmount(10))
  };

  if (allocations.length === 0) {
    return <div>No allocations found</div>;
  }

  return (
    <table className="table-auto border-collapse border-b border-gray-200 rounded p-2 w-full text-center">
      <thead>
        <tr className='border-b'>
          <th className="px-4 py-2 text-gray-800">Department</th>
          <th className="px-4 py-2 text-gray-800">Allocated Budget</th>
          <th className="px-4 py-2 text-gray-800">Increase by 10</th>
          <th className="px-4 py-2 text-gray-800">Decrease by 10</th>
          <th className="px-4 py-2 text-gray-800">Delete Allocation</th>
        </tr>
      </thead>
      <tbody>
        {allocations.map((allocation, index) => (
          <tr key={index} className='border-t border-b'>
            <td className="px-4 py-2">{allocation.name}</td>
            <td className="px-4 py-2">{allocation.value}{currentCurrency.substring(0, 2)}</td>
            <td className="px-4 py-2">
              <IncreaseButton
                onClick={() => handleIncreaseAllocationBy10(index)}
              />
            </td>
            <td className="px-4 py-2">
              <DecreaseButton onClick={() => handleDecreaseAllocationBy10(index)} />
            </td>
            <td className="px-4 py-2">
              <DeleteButton onClick={() => handleDeleteAllocation(index, allocation.value)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}


function AddAllocation() {
  const [nameValue, setNameValue] = useState('')
  const [costValue, setCostValue] = useState('')
  const [emptyInput, setEmptyInput] = useState(false)
  const dispatch = useDispatch();
  const currentCurrency = useSelector((state: CurrencyState) => state.currency.value);
  const currentBudget = useSelector((state: BudgetState) => state.budget.value);
  const currentExpense = useSelector((state: ExpenseState) => state.expense.value);
  const remaining = currentBudget - currentExpense;

  const workDepartments = [
    "Human Resources",
    "Finance",
    "Marketing",
    "Sales",
    "Information Technology",
    "Customer Service",
    "Research and Development",
    "Production",
    "Purchasing",
    "Legal",
    "Administration"
  ];
  const handleNameChange = (value: string) => {
    setNameValue(value)
  }

  const handleCostChange = (value: string) => {
    setCostValue(value);
  }

  const handleAllocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number(costValue) <= remaining) {
      dispatch(addAllocation({ name: nameValue, value: Number(costValue) }))
      dispatch(incrementByAmount(Number(costValue)))
      setEmptyInput(true)
    }
    else {
      alert(`the value cannot exceed the remaining ${remaining}${currentCurrency}`)
    }

  }

  useEffect(() => {
    if (emptyInput) {
      setEmptyInput(false);
    }
  }, [emptyInput]);

  return (
    <div className="flex flex-col gap-4">
      <AllocationsHeader title="Change Allocation" />
      <form className="flex gap-4 flex-col md:flex-row" onSubmit={handleAllocationSubmit}>
        <Select name='Department' options={workDepartments} onChange={handleNameChange} reset={emptyInput} />
        <Input label={currentCurrency.substring(0, 2)} type="number"
          onchange={handleCostChange} empty={emptyInput} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs"
          type='submit'>
          Save
        </button>
      </form>
    </div>

  );
}

export default function Allocations() {
  return (
    <div className="flex flex-col gap-7">
      <AllocationsHeader title="Allocations" />
      <AllocationList />
      <AddAllocation />
    </div>
  );
}
