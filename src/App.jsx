import SetupPage from './pages/SetupPage';
import { DropdownProvider } from './contexts/Setup';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import BudgetPage from './pages/BudgetPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import TransactionsPage from './pages/TransactionsPage';
import RootLayout from './layout/RootLayout';
import { useEffect } from 'react';
import db from './db/data';
import { useAsideBar } from './contexts/aside';
import { AppContextProvider } from './contexts/AppContext';
import { DashboardContextProvider } from './contexts/DashboardContext';

const App = () => {
  const { setupComplete, setSetupComplete } = useAsideBar();

  useEffect(() => {
    const fetchSetupStatus = async () => {
      const status = await db.settings.get('setupComplete');
      setSetupComplete(status?.value || false);
    };
    fetchSetupStatus();
  }, []);

  // show nothing until setupComplete is loaded
  if (setupComplete === null) return null;

  const router = createBrowserRouter([
    // If setup not complete, return to SetupPage no matter what
    ...(!setupComplete
      ? [
          {
            path: '*',
            element: <SetupPage />,
          },
        ]
      : [
          {
            path: '/',
            element: <RootLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'transactions', element: <TransactionsPage /> },
              { path: 'accounts', element: <AccountsPage /> },
              { path: 'reports', element: <ReportsPage /> },
              { path: 'budget', element: <BudgetPage /> },
              { path: 'settings', element: <SettingsPage /> },
              { path: '*', element: <Navigate to='/' replace /> },
            ],
          },
        ]),
  ]);

  return (
    <AppContextProvider>
      <DropdownProvider>
        <DashboardContextProvider>
          <RouterProvider router={router} />
        </DashboardContextProvider>
      </DropdownProvider>
    </AppContextProvider>
  );
};

export default App;
