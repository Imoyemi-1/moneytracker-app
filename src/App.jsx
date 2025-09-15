import SetupPage from './pages/SetupPage';
import { DropdownProvider } from './contexts/Setup';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import BudgetPage from './pages/BudgetPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import RootLayout from './layout/RootLayout';
import TransactionsPage from './pages/TransactionsPage';
import { useEffect, useState } from 'react';
import db from './db/data';
import { useAsideBar } from './contexts/aside';

const App = () => {
  const { setupComplete, setSetupComplete } = useAsideBar();

  useEffect(() => {
    const fetchSetupStatus = async () => {
      const status = await db.settings.get('setupComplete');
      setSetupComplete(status?.value || false);
    };
    fetchSetupStatus();
  }, [setupComplete]);

  if (setupComplete === null) {
    return;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: setupComplete ? <DashboardPage /> : <SetupPage />,
        },
        {
          path: 'transactions',
          element: <TransactionsPage />,
        },
        {
          path: 'accounts',
          element: <AccountsPage />,
        },
        {
          path: 'reports',
          element: <ReportsPage />,
        },
        {
          path: 'budget',
          element: <BudgetPage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
        },
      ],
    },
  ]);

  return (
    <DropdownProvider>
      <RouterProvider router={router} />
    </DropdownProvider>
  );
};

export default App;
