import { useContext } from 'react';
import Field from './Field';
import { AppContext } from '../contexts/AppContext';
import TransactionAmtField from './TransactionAmtField';

const NewTransactionForm = ({ activeTab }) => {
  const { accounts } = useContext(AppContext);
  return (
    <form>
      <div>
        <Field
          id='firstTransaction'
          isInput={false}
          label={activeTab !== 'income' ? 'From' : 'To'}
          dropDownList={accounts}
          selection={<div className='text-sm py-0.5'>{'opay'}</div>}
        />
        <TransactionAmtField />
      </div>
    </form>
  );
};

export default NewTransactionForm;
