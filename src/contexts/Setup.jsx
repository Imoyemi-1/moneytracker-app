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
    id === 'baseField'
      ? setSelected((prev) => ({
          ...prev,
          baseSelection: currenciesData.find(
            (currency) => currency.code === code
          ),
        }))
      : setSelected((prev) => ({
          ...prev,
          additionalSelection: [],
        }));
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
