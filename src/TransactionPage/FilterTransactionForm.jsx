import { useContext } from 'react';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import { useDropdown } from '../contexts/Setup';

const FilterTransactionForm = () => {
  const { setBaseInputEmpty, accounts } = useContext(AppContext);
  const { query } = useDropdown();
  const filteredForTags = ['tag', 'amala', 'eba'].filter((list) =>
    list.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAccount = accounts.filter((acc) =>
    acc.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <form className='p-3.5'>
        {/* selected account to filter transaction with and dropdown  to select the account to filter with*/}
        <Field
          id='accountFieldFilter'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredAccount}
          label='Account'
          placeholder=''
          selection=''
        />
        {/* selected tags to filter transaction with and dropdown  to select the tags to filter with*/}
        <Field
          id='tagsFieldFilter'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForTags}
          label='Tags'
          placeholder=''
          selection=''
        />
      </form>
    </div>
  );
};

export default FilterTransactionForm;
