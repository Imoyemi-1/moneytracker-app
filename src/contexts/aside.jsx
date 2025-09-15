import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(null);

function SidebarProvider({ children }) {
  // handle toggle states of sidebar
  const [isOpenSidebar, setOpenSidebar] = useState(false);

  const [setupComplete, setSetupComplete] = useState(null);
  return (
    <SidebarContext.Provider
      value={{
        isOpenSidebar,
        setOpenSidebar,
        setupComplete,
        setSetupComplete,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Dropdown helper hooks to get dropdown context
const useAsideBar = () => {
  return useContext(SidebarContext);
};

export { useAsideBar, SidebarProvider };
