import { useDispatch,useSelector } from 'react-redux';
import { changeCurrentCurrency } from '../features/currencySlice';
import { CurrencyState } from '../definitions';

export default function Currency() {
    const dispatch = useDispatch();
    const currencies = [
        "$ USD", // United States Dollar
        "€ EUR", // Euro
        "¥ JPY", // Japanese Yen
        "£ GBP", // British Pound Sterling
        "$ AUD", // Australian Dollar
        "$ CAD", // Canadian Dollar
        "₣ CHF", // Swiss Franc
        "¥ CNY", // Chinese Yuan
        "kr SEK", // Swedish Krona
        "$ NZD"  // New Zealand Dollar
      ];
      const currentCurrency = useSelector((state: CurrencyState) => state.currency.value);
      
  return (
    <div className="flex items-center space-x-2 bg-green-300 p-4 rounded-md">
      <div className="font-bold text-lg">Currency</div>
      <select className="border border-gray-300 rounded p-2" value={currentCurrency}
      onChange={(e) => dispatch(changeCurrentCurrency(e.target.value))}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
