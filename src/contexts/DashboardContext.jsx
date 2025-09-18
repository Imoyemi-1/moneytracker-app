import { createContext, useState } from 'react';
import { useDropdown } from './Setup';

const DashboardContext = createContext(null);

const DashboardContextProvider = ({ children }) => {
  const { selected } = useDropdown();
  const [firstAccountCode, setFirstAccountCode] = useState(
    selected.firstAccountTransaction.currencies[0]?.code
  );
  const [secondAccountCode, setSecondAccountCode] = useState(
    selected.secondAccountTransaction.currencies[1]?.code ||
      selected.secondAccountTransaction.currencies[0]?.code
  );

  //   derived account selected transaction amount for selection
  const transactionCurSelected = {
    firstAccountCur: firstAccountCode,
    secondAccountCur: secondAccountCode,
  };

  // handle change selection of account currencies

  const handleChangeSelected = (id, code) => {
    id === 'firstTransactionAmt'
      ? setFirstAccountCode(code)
      : setSecondAccountCode(code);
  };

  return (
    <DashboardContext.Provider
      value={{ transactionCurSelected, handleChangeSelected }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContextProvider, DashboardContext };
