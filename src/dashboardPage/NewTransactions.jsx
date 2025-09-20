import { clsx } from 'clsx/lite';
import { useContext, useState } from 'react';
import NewTransactionForm from './NewTransactionForm';
import { AppContext } from '../contexts/AppContext';

const NewTransactions = () => {
  const [activeTab, setActiveTab] = useState('expense');
  const { accounts } = useContext(AppContext);

  return (
    <>
      <div className='transaction text-sm flex border-b border-gray-300'>
        <a
          onClick={() => setActiveTab('expense')}
          className={clsx(
            'item red border-r border-gray-300',
            activeTab === 'expense' && 'active'
          )}
        >
          Expense
        </a>
        {accounts.length > 1 && (
          <a
            onClick={() => setActiveTab('transfer')}
            className={clsx(
              'item black border-r border-gray-300',
              activeTab === 'transfer' && 'active'
            )}
          >
            Transfer
          </a>
        )}

        <a
          onClick={() => setActiveTab('income')}
          className={clsx('item green', activeTab === 'income' && 'active')}
        >
          Income
        </a>
      </div>
      {/* add new transaction form to add new transactions  */}
      <div className='p-3.5 border-b border-gray-300'>
        <NewTransactionForm activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default NewTransactions;
