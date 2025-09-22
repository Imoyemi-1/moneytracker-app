import { useContext } from 'react';
import Field from '../components/Field';
import { AppContext } from '../contexts/AppContext';
import { useDropdown } from '../contexts/Setup';

const FilterTransactionForm = () => {
  const { setBaseInputEmpty, accounts } = useContext(AppContext);
  const { selected } = useDropdown();
  const filteredForTags = ['tag', 'amala', 'eba'];
  return (
    <div>
      <form className='p-3.5'>
        <Field
          id='accountFieldFilter'
          isInput={true}
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={accounts}
          label='Account'
          placeholder=''
          selection=''
        />
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
