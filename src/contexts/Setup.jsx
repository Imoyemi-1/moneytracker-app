import { createContext, useContext, useState } from 'react';
import currenciesData from '../../currencies.json';

const DropdownContext = createContext(null);

function DropdownProvider({ children }) {
  // add selection currencies to dropdown states

  const [selected, setSelected] = useState({
    baseSelection: currenciesData.find((currency) => currency.code === 'AED'),
    additionalSelection: [],
  });

  //
  const [openId, setOpenId] = useState(null);

  //
  const [query, setQuery] = useState('');

  // handle selection from dropdown

  const handleSelected = (id, code) => {
    if (id === 'baseField') {
      setSelected((prev) => ({
        ...prev,
        baseSelection: currenciesData.find((cur) => cur.code === code),
      }));
    } else {
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
