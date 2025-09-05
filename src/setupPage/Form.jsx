import { useRef, useState } from 'react';
import Field from '../components/Field';

const Form = () => {
  const [baseSelection, setBaseSelection] = useState('House');

  return (
    <form>
      <div>
        <Field
          label='Base Currency'
          selection={baseSelection}
          defaultPh=''
          FocusPh={baseSelection}
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
