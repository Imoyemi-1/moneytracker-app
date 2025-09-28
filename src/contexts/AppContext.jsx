import { createContext, useState, useEffect, useMemo } from 'react';
import db from '../db/data';
import { useLiveQuery } from 'dexie-react-hooks';

const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [rates, setRates] = useState(null);
  const allAccounts = useLiveQuery(() => db.accounts.toArray(), []);
  const transactions = useLiveQuery(() => db.transactions.toArray(), []);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditAccountMode, setIsEditAccountMode] = useState(false);
  const [isNewTransaction, setIsNewTransaction] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [isConfirmAccountDelete, setIsConfirmAccountDelete] = useState(false);
  const [isFilterTransaction, setIsFilterTransaction] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [activeTab, setActiveTab] = useState('expense');
  const [baseInputEmpty, setBaseInputEmpty] = useState(true);
  const [appliedTransactionFilter, setAppliedTransactionFilter] = useState({
    accountFilter: [],
    tagsFilter: [],
  });

  const accounts = useMemo(() => {
    if (!allAccounts) return [];
    return allAccounts.filter((item) => item.isArchived === false);
  }, [allAccounts]);

  useEffect(() => {
    // get rate from storage and fetch from api if no rate in storage or time up
    const fetchRate = async () => {
      const cached = await db.exchangeRates.get('latestRates');
      const now = Date.now();

      if (!cached || now > new Date(cached.nextUpdate).getTime()) {
        const res = await fetch(
          'https://v6.exchangerate-api.com/v6/eb7e378c2f0c2d0d8b6d630b/latest/USD'
        );
        const data = await res.json();

        await db.exchangeRates.put({
          id: 'latestRates',
          base: 'USD',
          data: data.conversion_rates,
          lastFetchedAt: Date.now(),
          nextUpdate: data.time_update_utc,
        });

        setRates(data.conversion_rates);
      } else {
        setRates(cached.data);
      }
    };
    fetchRate();
  }, []);

  if (!allAccounts || !transactions) return <div>Loading data...</div>;

  return (
    <AppContext.Provider
      value={{
        rates,
        setRates,
        accounts,
        baseInputEmpty,
        setBaseInputEmpty,
        transactions,
        isEditMode,
        setIsEditMode,
        transactionToEdit,
        setTransactionToEdit,
        activeTab,
        setActiveTab,
        isNewTransaction,
        setIsNewTransaction,
        isFilterTransaction,
        setIsFilterTransaction,
        appliedTransactionFilter,
        setAppliedTransactionFilter,
        isNewAccount,
        setIsNewAccount,
        isEditAccountMode,
        setIsEditAccountMode,
        accountToEdit,
        setAccountToEdit,
        isConfirmAccountDelete,
        setIsConfirmAccountDelete,
        allAccounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
