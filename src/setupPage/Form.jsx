import { useState } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';

// get countries data from currencies data

const Form = () => {
  const { currenciesData, selected, setSelected } = useDropdown();

  // remove currencies already selected from base list
  const filteredForBase = currenciesData.filter(
    (currency) => currency.code !== selected.baseSelection.code
  );

  return (
    <form>
      <div>
        <Field
          label='Base Currency'
          selection={selected.baseSelection}
          placeholder=''
        />
        <Field
          label='Additional Currencies (optional)'
          placeholder='Select additional currencies'
        />
      </div>
    </form>
  );
};

export default Form;
