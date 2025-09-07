import { useState } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { clsx } from 'clsx/lite';
// get countries data from currencies data

const Form = () => {
  const { currenciesData, selected, openId } = useDropdown();
  const [baseInputEmpty, setBaseInputEmpty] = useState(true);

  // remove currencies already selected from base list
  const filteredForSearch = currenciesData.filter(
    (currency) => currency.code !== selected.baseSelection.code
  );

  return (
    <form>
      <div>
        <Field
          id='baseField'
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={currenciesData}
          label='Base Currency'
          selection={
            <div
              className={clsx(
                //  toggle selection display when input have value
                'text-sm px-3.5 flex items-center',
                openId === 'baseField' && 'opacity-50',
                !baseInputEmpty && 'invisible'
              )}
            >
              <img
                className='mr-2.5 h-3.5 w-4 object-cover'
                src={selected.baseSelection.flag}
                alt={selected.baseSelection.country}
              />
              <span>
                {selected.baseSelection.code}, {selected.baseSelection.name}
              </span>
            </div>
          }
          placeholder=''
        />
        <Field
          id='additionalField'
          setBaseInputEmpty={setBaseInputEmpty}
          dropDownList={filteredForSearch}
          label='Additional Currencies (optional)'
          placeholder='Select additional currencies'
          selection={<div></div>}
        />
      </div>
    </form>
  );
};

export default Form;
