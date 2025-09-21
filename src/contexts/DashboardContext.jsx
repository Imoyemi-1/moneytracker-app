import { createContext, useContext, useEffect, useState } from 'react';
import { useDropdown } from './Setup';
import db from '../db/data';
import { useLiveQuery } from 'dexie-react-hooks';
import { AppContext } from './AppContext';

const DashboardContext = createContext(null);

const DashboardContextProvider = ({ children }) => {
  const { selected, resetAccountTransaction } = useDropdown();

  const { setActiveTab, setIsEditMode, isEditMode, setTransactionToEdit } =
    useContext(AppContext);

  // set first transaction amount code for transaction form
  const [firstAccountCode, setFirstAccountCode] = useState(
    selected.firstAccountTransaction.currencies[0]?.code
  );

  // set second transaction amount code for transaction form
  const [secondAccountCode, setSecondAccountCode] = useState(
    selected.secondAccountTransaction.currencies[1]?.code ||
      selected.secondAccountTransaction.currencies[0]?.code
  );

  // get tags saved and add unto it or start with new array
  const [tags, setTags] = useState(
    useLiveQuery(() => db.tags.toArray(), []) || []
  );

  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');

  // set transaction amount  code edit mode

  const setAmtCodeEdit = (firstCode, secondCode) => {
    setFirstAccountCode(firstCode);
    setSecondAccountCode(secondCode);
  };

  // Auto set code when change account
  useEffect(() => {
    if (isEditMode) return;
    setFirstAccountCode(selected.firstAccountTransaction.currencies[0]?.code);
    setSecondAccountCode(
      selected.secondAccountTransaction.currencies[1]?.code ||
        selected.secondAccountTransaction.currencies[0]?.code
    );
  }, [
    selected.firstAccountTransaction.id,
    selected.secondAccountTransaction.id,
  ]);

  //   derived account selected transaction amount code
  const transactionCurSelected = {
    firstAccountCode: firstAccountCode,
    secondAccountCode: secondAccountCode,
  };

  // handle change selection of account currencies

  const handleChangeSelected = (id, code) => {
    id === 'firstTransactionAmt'
      ? setFirstAccountCode(code)
      : setSecondAccountCode(code);
  };

  // reset states after edit
  const resetStateEdit = () => {
    setActiveTab('expense');
    setTransactionToEdit('');
    resetAccountTransaction();
    setAmount1('');
    setIsEditMode(false);
  };

  return (
    <DashboardContext.Provider
      value={{
        transactionCurSelected,
        handleChangeSelected,
        tags,
        setTags,
        resetStateEdit,
        setAmtCodeEdit,
        amount1,
        setAmount1,
        amount2,
        setAmount2,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContextProvider, DashboardContext };
