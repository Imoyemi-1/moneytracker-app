import { useContext } from 'react';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import TransactionAmtField from './TransactionAmtField';
import { useDropdown } from '../contexts/Setup';
import { DashboardContext } from '../contexts/DashboardContext';
import { useSaveTransactions } from '../hooks/useAccount';

const NewTransactionForm = ({ activeTab }) => {
  const { accounts, setBaseInputEmpty, rates } = useContext(AppContext);
  const { selected } = useDropdown();
  const { transactionCurSelected } = useContext(DashboardContext);

  // add new transactions
  const handleSubmit = (formData) => {
    const firstAccountAmount = formData.get('firstAccountAmount');
    const secondAccountAmount = formData.get('secondAccountAmount');
    const transactionNote = formData.get('transactionNote');
    const transactionDate = formData.get('transactionDate');

    // save new transaction to indexdb
    useSaveTransactions(
      {
        type: activeTab,
        firstAccountInfo: selected.firstAccountTransaction,
        firstAccountCode: transactionCurSelected?.firstAccountCur,
        firstAccountAmount: +firstAccountAmount || 0,
        secondAccountInfo: selected.secondAccountTransaction || null,
        secondAccountAmount: +secondAccountAmount || 0,
        secondAccountCode: transactionCurSelected?.secondAccountCur,
        note: transactionNote || '',
        date: transactionDate,
        tag: selected.tags,
      },
      rates
    );
  };

  return (
    <form action={handleSubmit}>
      <div>
        <Field
          id='firstTransaction'
          isInput={false}
          label={activeTab !== 'income' ? 'From' : 'To'}
          dropDownList={accounts}
          selection={
            <div className='text-sm py-0.5'>
              {selected.firstAccountTransaction.name}
            </div>
          }
        />
        <TransactionAmtField
          id='firstTransactionAmt'
          name='firstAccountAmount'
          selection={transactionCurSelected.firstAccountCur}
          dropDownList={selected.firstAccountTransaction.currencies}
        />
      </div>
      {/* show second field if only nav tab is on transfer */}
      {activeTab === 'transfer' && (
        <div className='mt-3.5'>
          <Field
            id='secondTransaction'
            isInput={false}
            label='To'
            dropDownList={accounts}
            selection={
              <div className='text-sm py-0.5'>
                {selected.secondAccountTransaction.name}
              </div>
            }
          />
          <TransactionAmtField
            id='secondTransactionAmt'
            name='secondAccountAmount'
            selection={transactionCurSelected.secondAccountCur}
            dropDownList={selected.secondAccountTransaction.currencies}
          />
        </div>
      )}
      <div className='mt-3.5'>
        <div>
          {activeTab !== 'transfer' && (
            <Field
              id='tagsField'
              isInput={true}
              setBaseInputEmpty={setBaseInputEmpty}
              dropDownList={[]}
              label='Tags'
              placeholder={
                selected.additionalSelection.length > 0
                  ? ''
                  : 'Choose existing tags or add new'
              }
              selection={[]}
            />
          )}

          <input
            className=' border text-sm w-full min-h-9.5 border-gray-200 rounded-md px-3.5 outline-0 focus:border-blue-200'
            type='text'
            placeholder='Note'
            name='transactionNote'
          />
        </div>
        <div className='flex mt-3.5 gap-3'>
          <div className='flex-1'>
            <input
              className=' border text-sm w-full  border-gray-200 rounded-md px-3.5 py-2 outline-0 focus:border-blue-200 '
              required
              type='date'
              defaultValue='2025-09-18'
              name='transactionDate'
            />
          </div>
          <div className='flex-1'>
            <button className='w-full bg-blue-800 text-sm  rounded-md text-white py-2'>
              Add {activeTab}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewTransactionForm;
