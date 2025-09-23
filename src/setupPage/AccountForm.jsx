import { useContext } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { useSaveAccount } from '../hooks/useAccount';
import { DashboardContext } from '../contexts/DashboardContext';

const groupList = ['Cash', 'Bank Account', 'Deposit', 'Credit', 'Asset'];

const AccountForm = () => {
  const { selected } = useDropdown();
  const { resetStateEdit } = useContext(DashboardContext);

  const handleSubmit = (formData) => {
    const accountName = formData.get('accountName');
    const baseCurLabel = formData.get('baseCurLabel') !== null;
    const baseCurAmount = formData.get('baseCurAmount');
    const showOnDashboard = formData.get('showOnDashboard') !== null;

    const additionalCurrencies = selected.additionalSelection.map((cur) => {
      return {
        code: cur.code,
        enabled: formData.get(`additional[${cur.code}][enabled]`) !== null,
        amount: +formData.get(`additional[${cur.code}][amount]`) || 0,
      };
    });

    // add account to the list
    useSaveAccount({
      type: selected.groupSelection,
      name: accountName,
      showOnDashboard,
      currencies: [
        {
          code: selected.baseSelection.code,
          amount: +baseCurAmount || 0,
          enabled: baseCurLabel,
        },
        ...additionalCurrencies,
      ],
    });
    resetStateEdit();
  };

  // for additional currencies amount

  const additionalAmountList = selected.additionalSelection.map((cur) => (
    <div key={cur.code} className='flex items-center text-sm mt-3.5'>
      <div className='flex-1'>
        <label className='flex items-center  cursor-pointer w-fit'>
          <input
            name={`additional[${cur.code}][enabled]`}
            className='w-4 h-4 accent-blue-500 mr-2 '
            type='checkbox'
          />
          {cur.name}
        </label>
      </div>
      <div className='w-[41%] box-border'>
        <div className='flex '>
          <input
            className='border w-full text-end font-mono border-gray-200 rounded px-3.5 py-2 rounded-tr-none rounded-br-none outline-0 focus:border focus:border-blue-300 placeholder:text-base placeholder:text-gray-300 focus:placeholder:text-gray-400 placeholder:font-medium'
            type='number'
            placeholder='Balance'
            step='0.01'
            name={`additional[${cur.code}][amount]`}
          />
          <div className='bg-gray-200 px-3 py-2 rounded rounded-tl-none rounded-bl-none text-gray-500 text-sm font-bdy'>
            {cur.code}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <form action={handleSubmit}>
      <div>
        <div className='flex flex-col '>
          <label className='font-medium mb-1 text-sm ' htmlFor='accountName'>
            Name <span className='text-red-600 '>*</span>
          </label>
          <input
            name='accountName'
            className='border border-gray-200 outline-0 rounded-md pl-4 py-2 placeholder:text-sm text-sm'
            type='text'
            id='accountName'
            placeholder='Account name'
            autoComplete='off'
            required
          />
        </div>
        <Field
          id='groupField'
          isInput={false}
          dropDownList={groupList}
          label='Group'
          selection={
            <div className='text-sm py-0.5'>{selected.groupSelection}</div>
          }
        />
      </div>

      {/* for base currency selection */}
      <div className='flex items-center text-sm'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              name='baseCurLabel'
              className='w-4 h-4 accent-blue-500 mr-2 '
              type='checkbox'
              defaultChecked
            />
            {selected.baseSelection.name}
          </label>
        </div>
        <div className='w-[41%] box-border'>
          <div className='flex '>
            <input
              className='border w-full text-end font-mono border-gray-200 rounded px-3.5 py-2 rounded-tr-none rounded-br-none outline-0 focus:border focus:border-blue-300 placeholder:text-base placeholder:text-gray-300 focus:placeholder:text-gray-400 placeholder:font-medium'
              type='number'
              placeholder='Balance'
              step='0.01'
              name='baseCurAmount'
            />
            <div className='bg-gray-200 px-3 py-2 rounded rounded-tl-none rounded-bl-none text-gray-500 text-sm font-bdy'>
              {selected.baseSelection.code}
            </div>
          </div>
        </div>
      </div>

      {additionalAmountList}

      {/* for save  account button */}
      <div className='flex items-center text-sm mt-3.5'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              name='showOnDashboard'
              className='w-4 h-4 accent-blue-500 mr-2 '
              type='checkbox'
              defaultChecked
            />
            Show on Dashboard
          </label>
        </div>
        <button className='bg-blue-700 text-white py-2.5 px-5 w-[41%] rounded'>
          Save Account
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
