import { createContext, useContext, useState } from 'react';
import currenciesData from '../../currencies.json';

const DropdownContext = createContext(null);

function DropdownProvider({ children }) {
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

const useDropdown = () => {
  return useContext(DropdownContext);
};

export { useDropdown, DropdownProvider };
