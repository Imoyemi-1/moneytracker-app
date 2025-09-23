import { createContext, useContext, useState, useEffect } from 'react';
import currenciesData from '../../currencies.json';
import { AppContext } from './AppContext';

const DropdownContext = createContext(null);

function DropdownProvider({ children }) {
  const { accounts, appliedTransactionFilter } = useContext(AppContext);
  // add selection currencies to dropdown states

  const [selected, setSelected] = useState({
    // selected default selection for dropdowns component
    baseSelection: currenciesData.find((currency) => currency.code === 'USD'),
    additionalSelection: [],
    groupSelection: 'Cash',
    firstAccountTransaction: accounts[0],
    secondAccountTransaction: accounts[1] || accounts[0],
    tags: [],
    accountFilterTransaction: [],
    tagsFilterTransaction: [],
  });

  // set transaction form info for edit

  const setAccountTransactionEdit = (firstId, secondId, tags) => {
    setSelected((prev) => ({
      ...prev,
      firstAccountTransaction: accounts?.find((acc) => acc.id === firstId),
      secondAccountTransaction:
        accounts.find((acc) => acc.id === secondId) ||
        accounts[1] ||
        accounts[0],
      tags,
    }));
  };

  // auto reset account transaction  when added new transaction

  const resetAccountTransaction = () => {
    setSelected((prev) => ({
      ...prev,
      firstAccountTransaction: accounts[0],
      secondAccountTransaction: accounts[1] || accounts[0],
      tags: [],
    }));
  };

  const resetFilterTransaction = () => {
    setSelected((prev) => ({
      ...prev,
      accountFilterTransaction: [],
      tagsFilterTransaction: [],
    }));
  };

  const defaultTransactionFilter = () => {
    setSelected((prev) => ({
      ...prev,
      accountFilterTransaction: appliedTransactionFilter.accountFilter,
      tagsFilterTransaction: appliedTransactionFilter.tagsFilter,
    }));
  };

  //
  const [openId, setOpenId] = useState(null);

  //
  const [query, setQuery] = useState('');

  // handle selection from dropdown

  const handleSelected = (id, code) => {
    // set base currency selection for base currency dropdown
    if (id === 'baseField') {
      setSelected((prev) => ({
        ...prev,
        baseSelection: currenciesData.find((cur) => cur.code === code),
      }));
      removeAdditionalCur(code);
    }

    // set account type selection for group dropdown
    else if (id === 'groupField') {
      setSelected((prev) => ({
        ...prev,
        groupSelection: code,
      }));
    }

    // set first new transaction  selection for first account  transaction dropdown
    else if (id === 'firstTransaction') {
      setSelected((prev) => ({
        ...prev,
        firstAccountTransaction: accounts?.find((acc) => acc.id === code),
      }));
    }

    // set first new transaction  selection for second account  transaction dropdown
    else if (id === 'secondTransaction') {
      setSelected((prev) => ({
        ...prev,
        secondAccountTransaction: accounts?.find((acc) => acc.id === code),
      }));
    }

    // set tags selections for transaction tag dropdown
    else if (id === 'tagsField') {
      setSelected((prev) => ({
        ...prev,
        tags: prev.tags.includes(code) ? prev.tags : [...prev.tags, code],
      }));
    }

    // set tags  transaction filter selections for filter transaction
    else if (id === 'tagsFieldFilter') {
      setSelected((prev) => ({
        ...prev,
        tagsFilterTransaction: prev.tagsFilterTransaction.includes(code)
          ? prev.tagsFilterTransaction
          : [...prev.tagsFilterTransaction, code],
      }));
    }

    // set tags  transaction filter selections for filter transaction
    else if (id === 'accountFieldFilter') {
      setSelected((prev) => ({
        ...prev,
        accountFilterTransaction: [
          ...prev.accountFilterTransaction,
          accounts.find((acc) => acc.id === code),
        ],
      }));
    }

    // set additional currency selections for additional currency dropdown
    else {
      setSelected((prev) => {
        const found = currenciesData.find((cur) => cur.code === code);

        // check if it's already in the array
        const exists = prev.additionalSelection.some(
          (cur) => cur.code === found.code
        );

        return {
          ...prev,
          additionalSelection: exists
            ? prev.additionalSelection
            : [...prev.additionalSelection, found],
        };
      });
    }
  };

  // remove currencies from additional list

  const removeAdditionalCur = (code) => {
    setSelected((prev) => {
      return {
        ...prev,
        additionalSelection: prev.additionalSelection.filter(
          (cur) => cur.code !== code
        ),
      };
    });
  };

  // remove currencies from additional list

  const removeTag = (tag) => {
    setSelected((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((word) => word !== tag),
      };
    });
  };

  // remove tags filter from tags filter transaction list

  const removeTagFilter = (tag) => {
    setSelected((prev) => {
      return {
        ...prev,
        tagsFilterTransaction: prev.tagsFilterTransaction.filter(
          (word) => word !== tag
        ),
      };
    });
  };

  // remove account filter from tags filter transaction list

  const removeAccountFilter = (id) => {
    setSelected((prev) => {
      return {
        ...prev,
        accountFilterTransaction: prev.accountFilterTransaction.filter(
          (acc) => acc.id !== id
        ),
      };
    });
  };

  return (
    <DropdownContext.Provider
      value={{
        currenciesData,
        selected,
        setSelected,
        handleSelected,
        openId,
        setOpenId,
        query,
        setQuery,
        removeAdditionalCur,
        removeTag,
        resetAccountTransaction,
        setAccountTransactionEdit,
        removeTagFilter,
        removeAccountFilter,
        resetFilterTransaction,
        defaultTransactionFilter,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

// Dropdown helper hooks to get dropdown context
const useDropdown = () => {
  return useContext(DropdownContext);
};

export { useDropdown, DropdownProvider };
