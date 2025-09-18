import { useContext } from 'react';
import Field from './Field';
import { AppContext } from '../contexts/AppContext';
import TransactionAmtField from './TransactionAmtField';
import { useDropdown } from '../contexts/Setup';
import { DashboardContext } from '../contexts/DashboardContext';

const NewTransactionForm = ({ activeTab }) => {
  const { accounts, setBaseInputEmpty } = useContext(AppContext);
  const { selected } = useDropdown();
  const { transactionCurSelected } = useContext(DashboardContext);

  return (
    <form>
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
            selection={transactionCurSelected.secondAccountCur}
            dropDownList={selected.secondAccountTransaction.currencies}
          />
        </div>
      )}
      <div className='mt-3.5'>
        <div>
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
          <input
            className=' border text-sm w-full min-h-9.5 border-gray-200 rounded-md px-3.5 outline-0 focus:border-blue-200'
            type='text'
            placeholder='Note'
          />
        </div>
      </div>
    </form>
  );
};

export default NewTransactionForm;
