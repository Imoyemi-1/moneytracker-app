import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(null);

function SidebarProvider({ children }) {
  const [isOpenSidebar, setOpenSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpenSidebar,
        setOpenSidebar,
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
