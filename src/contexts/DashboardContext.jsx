import { createContext, useContext, useEffect, useState } from 'react';
import { useDropdown } from './Setup';
import db from '../db/data';
import { useLiveQuery } from 'dexie-react-hooks';
import { AppContext } from './AppContext';

const DashboardContext = createContext(null);

const DashboardContextProvider = ({ children }) => {
  const { selected } = useDropdown();
  const { setActiveTab, setIsEditMode, setTransactionToEdit } =
    useContext(AppContext);
  const [firstAccountCode, setFirstAccountCode] = useState(
    selected.firstAccountTransaction.currencies[0]?.code
  );
  const [secondAccountCode, setSecondAccountCode] = useState(
    selected.secondAccountTransaction.currencies[1]?.code ||
      selected.secondAccountTransaction.currencies[0]?.code
  );
  const [tags, setTags] = useState(
    useLiveQuery(() => db.tags.toArray(), []) || []
  );

  // Auto set code when change account
  useEffect(() => {
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
    setIsEditMode(false);
    setActiveTab('expense');
    setTransactionToEdit('');
  };

  return (
    <DashboardContext.Provider
      value={{
        transactionCurSelected,
        handleChangeSelected,
        tags,
        setTags,
        resetStateEdit,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContextProvider, DashboardContext };
