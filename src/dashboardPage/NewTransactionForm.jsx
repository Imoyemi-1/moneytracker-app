import { useContext, useState } from 'react';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import TransactionAmtField from './TransactionAmtField';
import { useDropdown } from '../contexts/Setup';
import { DashboardContext } from '../contexts/DashboardContext';
import {
  useSaveTransactions,
  useUpdateTransactions,
} from '../hooks/useAccount';
import { ImCross } from 'react-icons/im';
import { convertCurrency } from '../hooks/useExchangeRates';

const NewTransactionForm = ({ activeTab }) => {
  const { accounts, setBaseInputEmpty, rates, isEditMode, transactionToEdit } =
    useContext(AppContext);
  const { selected, removeTag } = useDropdown();
  const {
    transactionCurSelected,
    tags,
    amount1,
    setAmount1,
    setAmount2,
    resetStateEdit,
  } = useContext(DashboardContext);

  const [today, setToday] = useState(new Date().toISOString().split('T')[0]);

  // add new transactions
  const handleSubmit = (formData) => {
    const firstAccountAmount = formData.get('firstAccountAmount');
    const secondAccountAmount = formData.get('secondAccountAmount');
    const transactionNote = formData.get('transactionNote');
    const transactionDate = formData.get('transactionDate');

    // save new transaction to indexdb
    !isEditMode
      ? useSaveTransactions(
          {
            type: activeTab,
            firstAccountInfo: selected.firstAccountTransaction,
            firstAccountCode: transactionCurSelected?.firstAccountCode,
            firstAccountAmount: +firstAccountAmount || 0,
            secondAccountInfo: selected.secondAccountTransaction || null,
            secondAccountAmount: +secondAccountAmount || 0,
            secondAccountCode: transactionCurSelected?.secondAccountCode,
            note: transactionNote || '',
            date: transactionDate,
            tag: selected.tags,
          },
          rates
        )
      : useUpdateTransactions(
          transactionToEdit,
          {
            type: activeTab,
            firstAccountInfo: selected.firstAccountTransaction,
            firstAccountCode: transactionCurSelected?.firstAccountCode,
            firstAccountAmount: +firstAccountAmount || 0,
            secondAccountInfo: selected.secondAccountTransaction || null,
            secondAccountAmount: +secondAccountAmount || 0,
            secondAccountCode: transactionCurSelected?.secondAccountCode,
            note: transactionNote || '',
            date: transactionDate,
            tag: selected.tags,
          },
          rates
        );

    // auto reset account transaction  when added new transaction
    resetStateEdit();
  };

  // remove tags from list already if its selected
  const filteredForTags = tags.filter(
    (tag) =>
      selected.tags.length === 0 || selected.tags.every((word) => tag !== word)
  );

  // tags selection  display

  const addTagsList = selected.tags.map((tag) => (
    <div
      className='tag flex gap-x-2 my-auto items-center text-sm whitespace-normal align-top  px-2.5 h-fit  bg-gray-300  hover:bg-gray-400 transition-colors duration-500 rounded-[2px] cursor-pointer'
      key={tag}
      onMouseDown={(e) => {
        e.stopPropagation();
        const removeBtn = e.target.closest('.removeBtn');
        removeBtn ? removeTag(tag) : null;
      }}
    >
      <span className='mb-1'>{tag}</span>
      <ImCross className='removeBtn text-gray-500 text-[0.65rem]  hover:text-gray-600 active:text-[0.625rem]' />
    </div>
  ));

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
          selection={transactionCurSelected.firstAccountCode}
          dropDownList={selected.firstAccountTransaction.currencies}
          isReadOnly={false}
          value={amount1}
          onChange={setAmount1}
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
            selection={transactionCurSelected.secondAccountCode}
            dropDownList={selected.secondAccountTransaction.currencies}
            isReadOnly={true}
            value={
              amount1
                ? convertCurrency(
                    amount1,
                    transactionCurSelected?.firstAccountCode,
                    transactionCurSelected?.secondAccountCode,
                    rates
                  ).toFixed(4)
                : null
            }
            onChange={setAmount2}
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
              dropDownList={filteredForTags}
              label='Tags'
              placeholder={
                selected.tags.length > 0
                  ? ''
                  : 'Choose existing tags or add new'
              }
              selection={addTagsList}
            />
          )}

          <input
            className=' border text-sm w-full min-h-9.5 border-gray-200 rounded-md px-3.5 outline-0 focus:border-blue-200'
            type='text'
            placeholder='Note'
            autoComplete='off'
            name='transactionNote'
            defaultValue={isEditMode ? transactionToEdit.note : null}
          />
        </div>
        <div className='flex mt-3.5 gap-3'>
          <div className='flex-1'>
            <input
              className='font-lato border text-sm w-full  border-gray-200 rounded-md px-3.5 py-2 outline-0 focus:border-blue-200 '
              required
              type='date'
              defaultValue={isEditMode ? transactionToEdit.date : today}
              name='transactionDate'
            />
          </div>
          <div className='flex-1'>
            <button className='w-full bg-blue-800 opacity-90 hover:opacity-100 duration-300 transition-opacity cursor-pointer text-sm  rounded-md text-white py-2'>
              {isEditMode ? 'Save' : 'Add'} {activeTab}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewTransactionForm;
