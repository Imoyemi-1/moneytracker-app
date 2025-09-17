import Field from './Field';

const NewTransactionForm = ({ activeTab }) => {
  return (
    <form>
      <Field
        id='firstTransaction'
        isInput={false}
        label={activeTab !== 'income' ? 'From' : 'To'}
        dropDownList={['Cash', 'Bank Account', 'Deposit', 'Credit', 'Asset']}
        selection={<div className='text-sm py-0.5'>{'Cash'}</div>}
      />
    </form>
  );
};

export default NewTransactionForm;
