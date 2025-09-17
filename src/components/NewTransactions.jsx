import { clsx } from 'clsx/lite';
import { useState } from 'react';

const NewTransactions = () => {
  const [activeTab, setActiveTab] = useState('expense');

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
        <a
          onClick={() => setActiveTab('transfer')}
          className={clsx(
            'item black border-r border-gray-300',
            activeTab === 'transfer' && 'active'
          )}
        >
          Transfer
        </a>
        <a
          onClick={() => setActiveTab('income')}
          className={clsx('item green', activeTab === 'income' && 'active')}
        >
          Income
        </a>
      </div>
    </>
  );
};

export default NewTransactions;
