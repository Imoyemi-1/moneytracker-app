import { useContext } from 'react';
import Field from '../components/Field';
import { useDropdown } from '../contexts/Setup';
import { useSaveAccount, useUpdateAccount } from '../hooks/useAccount';
import { DashboardContext } from '../contexts/DashboardContext';
import { AppContext } from '../contexts/AppContext';
import clsx from 'clsx';

const groupList = ['Cash', 'Bank Account', 'Deposit', 'Credit', 'Asset'];

const AccountForm = () => {
  const { selected } = useDropdown();
  const { isEditAccountMode, accountToEdit } = useContext(AppContext);
  const { resetStateEdit, accountName, setAccountName } =
    useContext(DashboardContext);

  const handleSubmit = (formData) => {
    const accountName = formData.get('accountName');
    const baseCurLabel = formData.get('baseCurLabel') !== null;
    const baseCurAmount = formData.get('baseCurAmount');
    const showOnDashboard = formData.get('showOnDashboard') !== null;

    //
    const formCurrencies = {
      base: {
        code: selected.baseSelection.code,
        enabled: baseCurLabel,
      },
      additional: selected.additionalSelection.map((cur) => ({
        code: cur.code,
        enabled: formData.get(`additional[${cur.code}][enabled]`) !== null,
      })),
    };

    const mergedCurrencies = accountToEdit?.currencies?.map((prevCur) => {
      // check if this currency is in base
      if (prevCur.code === formCurrencies.base.code) {
        return {
          ...prevCur,
          enabled: formCurrencies.base.enabled,
        };
      }

      // check if this currency is in additional
      const additionalMatch = formCurrencies.additional.find(
        (cur) => cur.code === prevCur.code
      );
      if (additionalMatch) {
        return {
          ...prevCur,
          enabled: additionalMatch.enabled,
        };
      }

      // if not in form at all → keep as is
      return prevCur;
    });

    if (isEditAccountMode) {
      useUpdateAccount({
        type: selected.groupSelection,
        name: accountName,
        showOnDashboard,
        currencies: mergedCurrencies,
        id: accountToEdit.id,
      });
    } else {
      const additionalCurrencies = selected.additionalSelection.map((cur) => ({
        code: cur.code,
        enabled: formData.get(`additional[${cur.code}][enabled]`) !== null,
        amount: +formData.get(`additional[${cur.code}][amount]`) || 0,
      }));

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
    }

    resetStateEdit();
  };

  const accToEditCur = accountToEdit?.currencies || [];
  // for additional currencies amount

  const additionalAmountList = selected.additionalSelection.map((cur) => {
    const accToEditAmount =
      accToEditCur.filter((curr) => curr?.code === cur.code)[0]?.amount ?? 0;

    return (
      <div key={cur.code} className='flex items-center text-sm my-3.5'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              name={`additional[${cur.code}][enabled]`}
              className='w-4 h-4 accent-blue-500 mr-2'
              type='checkbox'
              defaultChecked={
                isEditAccountMode
                  ? accToEditCur.find((c) => c.code === cur.code)?.enabled ??
                    false
                  : false
              }
            />
            {cur.name}
          </label>
        </div>
        <div className='w-[41%] box-border'>
          <div className='flex '>
            {!isEditAccountMode && (
              <>
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
              </>
            )}
            {isEditAccountMode && (
              <span
                className={clsx(
                  'font-mono text-right w-full',
                  accToEditAmount >= 0 && 'text-green-600',
                  accToEditAmount < 0 && 'text-red-600'
                )}
              >
                {accToEditAmount.toFixed(2)} {cur.code}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  });

  const accToEditBaseAmount =
    accToEditCur.filter((cur) => cur?.code === selected.baseSelection.code)[0]
      ?.amount ?? 0;

  return (
    <form action={handleSubmit}>
      <div>
        <div className='flex flex-col '>
          <label className='font-medium mb-1 text-sm ' htmlFor='accountName'>
            Name <span className='text-red-600 '>*</span>
          </label>
          <input
            name='accountName'
            className='border border-gray-200 outline-0 rounded-md pl-4 py-2 placeholder:text-sm text-sm focus:border-blue-300 '
            type='text'
            id='accountName'
            placeholder='Account name'
            autoComplete='off'
            required
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
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
      <div className='flex items-center text-sm my-3.5'>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              name='baseCurLabel'
              className='w-4 h-4 accent-blue-500 mr-2'
              type='checkbox'
              defaultChecked={
                isEditAccountMode
                  ? accToEditCur.find(
                      (cur) => cur.code === selected.baseSelection.code
                    )?.enabled ?? false
                  : true
              }
            />

            {selected.baseSelection.name}
          </label>
        </div>
        <div className='w-[41%] box-border'>
          <div className='flex '>
            {!isEditAccountMode && (
              <>
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
              </>
            )}
            {isEditAccountMode && (
              <span
                className={clsx(
                  'font-mono text-right w-full',
                  accToEditBaseAmount >= 0 && 'text-green-600',
                  accToEditBaseAmount < 0 && 'text-red-600'
                )}
              >
                {accToEditBaseAmount.toFixed(2)} {selected.baseSelection.code}
              </span>
            )}
          </div>
        </div>
      </div>

      {additionalAmountList}

      {/* for save  account button */}
      <div className='flex items-center text-sm '>
        <div className='flex-1'>
          <label className='flex items-center  cursor-pointer w-fit'>
            <input
              name='showOnDashboard'
              className='w-4 h-4 accent-blue-600 mr-2 '
              type='checkbox'
              defaultChecked
            />
            Show on Dashboard
          </label>
        </div>
        <button className=' text-white py-2 px-5 w-[41%] rounded bg-blue-800 hover:opacity-90 duration-200 transition-opacity cursor-pointer'>
          {isEditAccountMode ? 'Update Account' : 'Save Account'}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
