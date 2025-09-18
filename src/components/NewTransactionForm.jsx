import { useContext } from 'react';
import Field from './Field';
import { AppContext } from '../contexts/AppContext';
import TransactionAmtField from './TransactionAmtField';
import { useDropdown } from '../contexts/Setup';

const NewTransactionForm = ({ activeTab }) => {
  const { accounts } = useContext(AppContext);
  const { selected } = useDropdown();

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
        <TransactionAmtField />
      </div>
    </form>
  );
};

export default NewTransactionForm;
