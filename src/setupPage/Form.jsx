import { useState } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';

// get countries data from currencies data

const Form = () => {
  const { currenciesData, selected, setSelected } = useDropdown();

  return (
    <form>
      <div>
        <Field
          label='Base Currency'
          selection={selected.baseSelection.code}
          defaultPh=''
          FocusPh={selected.baseSelection.code}
        />
        <Field
          label='Additional Currencies (optional)'
          defaultPh='Select additional currencies'
          FocusPh='Select additional currencies'
        />
      </div>
    </form>
  );
};

export default Form;
