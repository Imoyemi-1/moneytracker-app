import { createContext, useContext, useState } from 'react';
import currenciesData from '../../currencies.json';

const DropdownContext = createContext(null);

function DropdownProvider({ children }) {
  // add selection currencies to dropdown states

  const [selected, setSelected] = useState({
    baseSelection: currenciesData.find((currency) => currency.code === 'USD'),
    additionalSelection: [],
  });

  return (
    <DropdownContext.Provider value={{ currenciesData, selected, setSelected }}>
      {children}
    </DropdownContext.Provider>
  );
}

// Dropdown helper hooks to get dropdown context
const useDropdown = () => {
  return useContext(DropdownContext);
};

export { useDropdown, DropdownProvider };
