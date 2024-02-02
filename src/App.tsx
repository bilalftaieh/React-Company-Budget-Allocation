import Budget from './components/Budget'
import Expenses from './components/Expenses'
import Header from './components/Header'
import Remaining from './components/Remaining'
import SpentSoFar from './components/SpentSoFar'

function App() {

  return (
    <div className='flex flex-col gap-7 px-4 md:px-10 py-5 overflow-hidden'>
      <Header />

      <div className='flex flex-col md:flex-row gap-6'>
        <Budget />
        <Remaining />
        <SpentSoFar />
      </div>

      <Expenses />
    </div>
  )
}

export default App
