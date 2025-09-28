import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDropdown } from './Setup';
import db from '../db/data';
import { AppContext } from './AppContext';

const DashboardContext = createContext(null);

const DashboardContextProvider = ({ children }) => {
  const {
    selected,
    resetAccountTransaction,
    resetFilterTransaction,
    resetAccountGroup,
  } = useDropdown();

  const {
    setActiveTab,
    setIsEditMode,
    isEditMode,
    setTransactionToEdit,
    setIsNewTransaction,
    setIsFilterTransaction,
    accounts,
    setIsNewAccount,
    setAccountToEdit,
    setIsEditAccountMode,
    setIsConfirmAccountDelete,
  } = useContext(AppContext);

  // set first transaction amount code for transaction form
  const [firstAccountCode, setFirstAccountCode] = useState(null);

  // set second transaction amount code for transaction form
  const [secondAccountCode, setSecondAccountCode] = useState(null);

  // get tags saved and add unto it or start with new array
  const [tags, setTags] = useState([]);
  useEffect(() => {
    db.tags.toArray().then((storedTags) => {
      setTags(storedTags.map((t) => t.tag));
    });
  }, []);

  // Auto set code when change account
  useEffect(() => {
    if (isEditMode || !selected.firstAccountTransaction) return;
    setFirstAccountCode(
      !accounts ||
        accounts.length < 1 ||
        !selected.firstAccountTransaction?.currencies
        ? null
        : selected.firstAccountTransaction?.currencies.filter(
            (cur) => cur?.enabled
          )[0]?.code
    );
    setSecondAccountCode(
      !accounts ||
        accounts.length < 1 ||
        !selected.firstAccountTransaction?.currencies
        ? null
        : selected.secondAccountTransaction?.currencies.filter(
            (cur) => cur?.enabled
          )[1]?.code ||
            selected.secondAccountTransaction?.currencies.filter(
              (cur) => cur?.enabled
            )[0]?.code
    );
  }, [
    selected.firstAccountTransaction?.id,
    selected.secondAccountTransaction?.id,
  ]);

  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');

  const [accountName, setAccountName] = useState('');
  const [note, setNote] = useState('');

  // set transaction amount  code edit mode

  const setAmtCodeEdit = (firstCode, secondCode) => {
    setFirstAccountCode(firstCode);
    setSecondAccountCode(secondCode);
  };

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
    setTransactionToEdit(null);
    setAmount1('');
    setAccountName('');
    setNote('');
    resetAccountGroup();
    setIsEditMode(false);
    setIsNewTransaction(false);
    setIsNewAccount(false);
    setIsFilterTransaction(false);
    resetFilterTransaction();
    setAccountToEdit(null);
    setIsEditAccountMode(false);
    setIsConfirmAccountDelete(false);
    resetAccountTransaction();
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
        accountName,
        setAccountName,
        note,
        setNote,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContextProvider, DashboardContext };
