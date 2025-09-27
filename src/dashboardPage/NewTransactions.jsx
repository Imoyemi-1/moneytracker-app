import { clsx } from 'clsx/lite';
import { useContext } from 'react';
import NewTransactionForm from './NewTransactionForm';
import { AppContext } from '../contexts/AppContext';

const NewTransactions = () => {
  const { accounts, isEditMode, transactionToEdit, activeTab, setActiveTab } =
    useContext(AppContext);

  return (
    <>
      {accounts.length <= 0 ? (
        <div className='px-3.5 text-sm min-h-12.5 flex items-center border-b border-gray-300'>
          You don't have any accounts.
        </div>
      ) : (
        <>
          <div className='transaction text-sm flex border-b border-gray-300 cursor-pointer'>
            <a
              onClick={() => setActiveTab('expense')}
              className={clsx(
                'item red border-r border-gray-300',
                activeTab === 'expense' && 'active'
              )}
            >
              Expense
            </a>
            {accounts.length <= 1 &&
            accounts[0]?.currencies.filter((cur) => cur.enabled).length <=
              1 ? null : isEditMode &&
              transactionToEdit?.type !== 'transfer' ? null : (
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
          <div className='p-3.5 '>
            <NewTransactionForm
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NewTransactions;
